'use client'
import { useState, useEffect } from 'react'

const WALLET_STORAGE_KEY = 'yadavji-khel-wallet-balance'

export function useWallet() {
  const [balance, setBalance] = useState<number>(5240) 

  useEffect(() => {
    // This effect runs only on the client, after initial hydration.
    const storedValue = localStorage.getItem(WALLET_STORAGE_KEY);
    if (storedValue) {
      setBalance(parseFloat(storedValue));
    } else {
      // If no value in storage, initialize it.
      localStorage.setItem(WALLET_STORAGE_KEY, '5240');
    }

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === WALLET_STORAGE_KEY && e.newValue) {
            setBalance(parseFloat(e.newValue));
        }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateBalance = (updater: number | ((prev: number) => number)) => {
    // To ensure we're updating based on the latest value, we can use the function form of setState
    setBalance(currentBalance => {
        const newBalance = typeof updater === 'function' ? updater(currentBalance) : updater;
        localStorage.setItem(WALLET_STORAGE_KEY, String(newBalance));
        return newBalance;
    });
  };
  
  return [balance, updateBalance] as const;
}
