'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Wallet, CircleUser, Gavel, Home, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useWallet } from '@/hooks/use-wallet'
import { createClient } from '@/lib/supabase/client'

type UserSession = {
  user: { id: string; name: string; email: string; mobile: string; };
  wallet: { id: string; user_id: string; balance: number };
}

type BankAccount = {
  id: string
  user_id: string
  account_holder_name: string
  bank_name: string
  account_number: string
  ifsc_code: string
}

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '/my-bids' },
    { label: 'Profile', icon: CircleUser, href: '/profile', active: true },
];

export default function ProfilePage() {
    const router = useRouter()
    const { toast } = useToast()
    const supabase = createClient()
    const [walletBalance] = useWallet()
    const [session, setSession] = useState<UserSession | null>(null)
    const [isClient, setIsClient] = useState(false)
    
    // Bank details form state
    const [bankAccount, setBankAccount] = useState<BankAccount | null>(null)
    const [accountHolderName, setAccountHolderName] = useState('')
    const [bankName, setBankName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [ifscCode, setIfscCode] = useState('')

    useEffect(() => {
        setIsClient(true)
        const sessionRaw = localStorage.getItem('yadavji-user')
        if (sessionRaw) {
            const currentSession = JSON.parse(sessionRaw) as UserSession;
            setSession(currentSession)

            const fetchBankDetails = async () => {
                if (currentSession?.user?.id) {
                    const { data, error } = await supabase
                        .from('bank_accounts')
                        .select('*')
                        .eq('user_id', currentSession.user.id)
                        .maybeSingle(); // Fetches one record or null

                    if (error) {
                        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch bank details.' });
                        return;
                    }

                    if (data) {
                        setBankAccount(data);
                        setAccountHolderName(data.account_holder_name);
                        setBankName(data.bank_name);
                        setAccountNumber(data.account_number);
                        setIfscCode(data.ifsc_code);
                    }
                }
            };
            fetchBankDetails();

        } else {
            router.replace('/login')
        }
    }, [router, supabase, toast])

    const handleSaveOrUpdateBankDetails = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!session?.user?.id) {
            toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to add or update a bank account.' })
            return
        }

        if (!accountHolderName || !bankName || !accountNumber || !ifscCode) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please fill out all bank detail fields.' })
            return
        }

        const detailsToSave = {
            user_id: session.user.id,
            account_holder_name: accountHolderName,
            bank_name: bankName,
            account_number: accountNumber,
            ifsc_code: ifscCode,
        }

        if (bankAccount) {
            // Update existing account
            const { error } = await supabase
                .from('bank_accounts')
                .update(detailsToSave)
                .eq('id', bankAccount.id);
            
            if (error) {
                toast({ variant: 'destructive', title: 'Failed to update details', description: error.message })
            } else {
                toast({ title: 'Success', description: 'Bank account details updated successfully.' })
            }
        } else {
            // Insert new account
            const { data: newAccount, error } = await supabase
                .from('bank_accounts')
                .insert(detailsToSave)
                .select()
                .single()

            if (error) {
                toast({ variant: 'destructive', title: 'Failed to save details', description: error.message })
            } else {
                toast({ title: 'Success', description: 'Bank account details saved successfully.' })
                if (newAccount) {
                    setBankAccount(newAccount);
                }
            }
        }
    }
    
    if (!isClient || !session) {
        return null; // or a loading spinner
    }

    return (
        <div className="bg-background min-h-screen font-sans">
            <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 bg-primary text-black shadow-md">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-black hover:bg-black/10" onClick={() => router.push('/')}>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-xl font-bold">YadavJi Khel</h1>
                </div>
                <Button
                    variant="outline"
                    className="rounded-full bg-white border-yellow-300 text-black h-9 px-4 font-semibold flex items-center gap-2"
                >
                    <Wallet className="h-5 w-5" />
                    <span>₹ {walletBalance.toFixed(2)}</span>
                </Button>
            </header>

            <main className="py-4 pb-24">
                <div className="max-w-4xl mx-auto px-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CircleUser />
                                My Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Username:</span>
                                <span className="font-medium">{session.user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Mobile:</span>
                                <span className="font-medium">{session.user.mobile}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Email:</span>
                                <span className="font-medium">{session.user.email}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Landmark />
                                Bank Account Details
                            </CardTitle>
                            <CardDescription>
                                {bankAccount ? 'Update your bank account for withdrawals.' : 'Add your bank account for withdrawals. This information is stored securely.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSaveOrUpdateBankDetails} className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                                    <Input id="accountHolder" value={accountHolderName} onChange={e => setAccountHolderName(e.target.value)} placeholder="e.g. John Doe" className="bg-white" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="bankName">Bank Name</Label>
                                    <Input id="bankName" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="e.g. HDFC Bank" className="bg-white" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="accountNumber">Account Number</Label>
                                    <Input id="accountNumber" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Enter your account number" className="bg-white" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="ifsc">IFSC Code</Label>
                                    <Input id="ifsc" value={ifscCode} onChange={e => setIfscCode(e.target.value)} placeholder="Enter bank's IFSC code" className="bg-white" />
                                </div>
                                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                    {bankAccount ? 'Update Bank Details' : 'Save Bank Details'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-30 bg-primary text-primary-foreground shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
                <div className="flex justify-around">
                    {bottomNavItems.map(item => (
                        <Link href={item.href} key={item.label} passHref>
                            <Button variant="ghost" className={`flex-1 flex-col h-16 rounded-none ${item.active ? 'bg-black/20' : ''} hover:bg-black/10 text-primary-foreground`}>
                                <item.icon className="h-6 w-6" />
                                <span className="text-xs mt-1">{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </footer>
        </div>
    )
}
