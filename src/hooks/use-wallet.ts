'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from './use-toast'

const USER_STORAGE_KEY = 'yadavji-user'

type UserSession = {
  user: { id: string; [key: string]: any };
  wallet: { id: string; user_id: string; balance: number };
}

export function useWallet() {
  const [session, setSession] = useState<UserSession | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const supabase = createClient()
  const { toast } = useToast()

  // Effect to load initial session and set up listeners
  useEffect(() => {
    const storedSessionRaw = localStorage.getItem(USER_STORAGE_KEY)
    if (storedSessionRaw) {
      try {
        const storedSession = JSON.parse(storedSessionRaw)
        if (storedSession?.user?.id && storedSession?.wallet?.id) {
          setSession(storedSession)
          setBalance(storedSession.wallet.balance)
        } else {
          // Clear invalid session
          localStorage.removeItem(USER_STORAGE_KEY)
        }
      } catch (e) {
        console.error("Failed to parse user session from localStorage", e)
        localStorage.removeItem(USER_STORAGE_KEY)
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === USER_STORAGE_KEY) {
            if (e.newValue) {
                try {
                    const newSession = JSON.parse(e.newValue);
                    if (newSession?.wallet) {
                        setSession(newSession);
                        setBalance(newSession.wallet.balance);
                    }
                } catch(e) {
                    console.error("Failed to parse new user session from storage event", e)
                }
            } else {
                setSession(null);
                setBalance(0);
            }
        }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Effect to fetch latest balance from DB when session is loaded
  useEffect(() => {
    if (session?.wallet?.id) {
      const fetchLatestBalance = async () => {
        const { data, error } = await supabase
          .from('wallets')
          .select('balance')
          .eq('id', session.wallet.id)
          .single()

        if (error) {
          console.error("Error fetching latest wallet balance:", error.message)
        } else if (data) {
          const dbBalance = data.balance;
          if (dbBalance !== balance) {
            setBalance(dbBalance);
            const updatedSession = {
              ...session,
              wallet: { ...session.wallet, balance: dbBalance },
            }
            setSession(updatedSession);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedSession));
          }
        }
      }
      fetchLatestBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.wallet?.id, supabase]);

  const updateBalanceInDb = useCallback(async (newBalance: number) => {
    if (!session?.wallet?.id) {
        console.error("Cannot update balance in DB: wallet ID is missing.");
        return { error: new Error("Wallet session not found.") };
    }
    const { error } = await supabase
      .from('wallets')
      .update({ balance: newBalance })
      .eq('id', session.wallet.id)
    return { error };
  }, [session, supabase]);
  

  const updateBalance = useCallback(async (updater: number | ((prev: number) => number)) => {
    const newBalance = typeof updater === 'function' ? updater(balance) : updater;
    setBalance(newBalance); // Optimistic update

    if (session && session.wallet) {
        const { error } = await updateBalanceInDb(newBalance)
        if (error) {
            // Revert state if DB update fails
            setBalance(session.wallet.balance); // Revert to last known good balance from session
            toast({
                variant: "destructive",
                title: "Sync Error",
                description: "Failed to update your wallet balance. Please try again.",
            });
            console.error("Failed to update wallet balance in DB:", error.message);
        } else {
            // Update localStorage on successful DB update
            const newSession = {
                ...session,
                wallet: { ...session.wallet, balance: newBalance },
            };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newSession));
            setSession(newSession); // Update local session state
        }
    }
  }, [balance, session, updateBalanceInDb, toast]);

  return [balance, updateBalance] as const;
}
