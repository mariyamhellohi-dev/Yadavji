'use client'

import { useState, useMemo } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Wallet, CircleUser, Gavel, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useWallet } from '@/hooks/use-wallet'
import { triplePattiDigits } from '@/lib/data'

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '#'},
    { label: 'Profile', icon: CircleUser, href: '/profile' },
]

const amountShortcuts = [5, 10, 50, 100, 200, 500, 1000, 5000];

export default function TriplePattiPage() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const { toast } = useToast()

    const gameName = searchParams.get('name') || 'Game'
    
    const [walletBalance, setWalletBalance] = useWallet();
    const [showAddMoneyDialog, setShowAddMoneyDialog] = useState(false);

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [bids, setBids] = useState<{[key: string]: string}>(
        triplePattiDigits.reduce((acc, digit) => ({...acc, [digit]: ''}), {})
    );

    const handleAmountClick = (amount: number) => {
        setSelectedAmount(currentAmount => currentAmount === amount ? null : amount);
    };

    const handleDigitClick = (digit: string) => {
        if (selectedAmount !== null) {
            setBids(prevBids => {
                const currentPoints = parseInt(prevBids[digit] || '0', 10);
                const newPoints = currentPoints + selectedAmount;
                
                return {
                    ...prevBids,
                    [digit]: newPoints.toString()
                };
            });
        }
    };

    const handleReset = () => {
        setBids(triplePattiDigits.reduce((acc, digit) => ({...acc, [digit]: ''}), {}));
        setSelectedAmount(null);
    }

    const totalPoints = useMemo(() => {
        return Object.values(bids).reduce((sum, point) => sum + (parseInt(point) || 0), 0)
    }, [bids]);
    
    const today = format(new Date(), 'dd/MM/yyyy')

    const handleSubmit = () => {
        if (totalPoints === 0) {
            toast({
                variant: 'destructive',
                title: 'No bids placed',
                description: 'Please place at least one bid to submit.',
            });
            return;
        }

        if (totalPoints <= walletBalance) {
            toast({
                title: 'Bid Submitted Successfully!',
                description: `Your bid of ${totalPoints} points has been placed.`,
            });
            setWalletBalance(prevBalance => prevBalance - totalPoints);
            setTimeout(() => {
                router.push('/');
            }, 1500); 
        } else {
            setShowAddMoneyDialog(true);
        }
    };

    return (
        <>
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
                        <Card className="bg-card border-border shadow-md">
                            <CardContent className="p-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    <Input value={today} readOnly className="text-center font-semibold bg-white" />
                                     <Select defaultValue="open">
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select Session" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="open">{gameName} OPEN</SelectItem>
                                            <SelectItem value="close">{gameName} CLOSE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-center text-accent font-semibold mb-4">Select Amount</h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {amountShortcuts.map(amount => (
                                            <Button 
                                                key={amount} 
                                                variant={selectedAmount === amount ? 'default' : 'outline'}
                                                className={cn({ 'bg-white': selectedAmount !== amount })}
                                                onClick={() => handleAmountClick(amount)}
                                            >
                                                ₹ {amount}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-center text-accent font-semibold mb-4">Select Triple Patti Digits</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-6">
                                        {triplePattiDigits.map(digit => (
                                            <div key={digit} className="space-y-1" onClick={() => handleDigitClick(digit)}>
                                                <label className="text-sm font-medium text-center block text-muted-foreground">{digit}</label>
                                                <Input 
                                                    type="text" 
                                                    placeholder="Points"
                                                    value={bids[digit]}
                                                    readOnly
                                                    className="text-center cursor-pointer bg-white"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center font-bold pt-4">
                                    Total Points : {totalPoints}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <Button variant="outline" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={handleReset}>Reset</Button>
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSubmit}>Submit</Button>
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
            
            <AlertDialog open={showAddMoneyDialog} onOpenChange={setShowAddMoneyDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Insufficient Balance</AlertDialogTitle>
                        <AlertDialogDescription>
                            You do not have enough funds to place this bet. Please add money to your wallet to continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => router.push('/add-fund')}>Add Money</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
