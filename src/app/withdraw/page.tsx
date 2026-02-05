'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Wallet, CircleUser, Gavel, Home, Banknote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useWallet } from '@/hooks/use-wallet'

// Dummy data for bank accounts
const bankAccounts = [
    { id: '1', name: 'HDFC Bank - XXXX 1234', value: 'hdfc-1234' },
    { id: '2', name: 'ICICI Bank - XXXX 5678', value: 'icici-5678' },
];

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '#' },
    { label: 'Profile', icon: CircleUser, href: '#' },
];

export default function WithdrawPage() {
    const router = useRouter()
    const { toast } = useToast()
    
    const [walletBalance, setWalletBalance] = useWallet()
    const [amount, setAmount] = useState('')
    const [selectedAccount, setSelectedAccount] = useState(bankAccounts[0].value)

    const handleWithdraw = () => {
        const numericAmount = parseFloat(amount)

        if (isNaN(numericAmount) || numericAmount <= 0) {
            toast({
                variant: 'destructive',
                title: 'Invalid Amount',
                description: 'Please enter a valid amount to withdraw.',
            })
            return
        }

        if (numericAmount > walletBalance) {
            toast({
                variant: 'destructive',
                title: 'Insufficient Balance',
                description: `You cannot withdraw more than your wallet balance of ₹${walletBalance.toFixed(2)}.`,
            })
            return
        }

        // Process withdrawal
        toast({
            title: 'Withdrawal Request Submitted',
            description: `Your request to withdraw ₹${numericAmount.toFixed(2)} is being processed.`,
        })
        setWalletBalance(prev => prev - numericAmount);
        router.push('/')
    }

    return (
        <div className="bg-background min-h-screen font-sans">
            <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 bg-primary text-black shadow-md">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-black hover:bg-black/10" onClick={() => router.back()}>
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
                <div className="max-w-4xl mx-auto px-4">
                    <Card className="bg-card border-border shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-bold">Withdraw Fund</CardTitle>
                            <CardDescription className="text-center">Send money to your bank account.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Select Bank Account</label>
                                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                                        <SelectTrigger className="bg-white mt-1">
                                            <SelectValue placeholder="Select a bank account" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bankAccounts.map(account => (
                                                <SelectItem key={account.id} value={account.value}>{account.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="p-4 rounded-lg bg-muted text-center">
                                    <p className="text-sm text-muted-foreground">Available Balance</p>
                                    <p className="text-3xl font-bold">₹ {walletBalance.toFixed(2)}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Amount to Withdraw</label>
                                    <Input 
                                        type="number" 
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 h-12 text-lg text-center bg-white"
                                    />
                                </div>
                                
                                <Button className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleWithdraw}>
                                    <Banknote className="mr-2 h-5 w-5" />
                                    Withdraw Money
                                </Button>
                            </div>

                            <div className="text-center text-xs text-muted-foreground space-y-2 pt-4 border-t">
                                <p>Withdrawal requests may take up to 24 hours.</p>
                                <p>Your funds will be credited to your bank account within 24 hours. Please rest assured that your money is always safe with us.</p>
                                <p className="font-semibold text-destructive">Note: Sunday withdrawals are off.</p>
                                <p className="font-semibold text-destructive">NOTE: Kindly update your bank details first, then you can withdraw amount.</p>
                            </div>

                            <div className="text-center space-y-3 pt-4">
                                <p className="text-sm font-medium">Unable to Withdraw Fund?</p>
                                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 font-bold">
                                    Contact Admin
                                </Button>
                            </div>
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
