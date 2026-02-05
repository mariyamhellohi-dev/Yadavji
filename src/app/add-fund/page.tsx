'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Wallet, CircleUser, Gavel, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '#'},
    { label: 'Profile', icon: CircleUser, href: '#' },
]

const amountShortcuts = [500, 1000, 2000, 5000];

export default function AddFundPage() {
    const router = useRouter()
    const [amount, setAmount] = useState('');
    const [walletBalance, setWalletBalance] = useState(5240);

    const handleAmountClick = (value: number) => {
        setAmount(value.toString());
    };

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
                        <CardContent className="p-6 space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">Add Fund via UPI</h2>
                                <p className="text-muted-foreground text-sm">Add points to your wallet.</p>
                            </div>

                            <div className="text-center text-sm text-muted-foreground space-y-1">
                                <p>Payment add krne ke 5 minute ke andar aapke wallet me points add ho jayenge.</p>
                                <p>Dont worry Wait kriye.</p>
                                <p className="font-semibold text-foreground">Your money is always safe with Play Matka Online</p>
                            </div>

                            <div className="relative my-6">
                                <Separator />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-card px-3 text-sm font-medium text-primary">Enter Amount</span>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <Input 
                                    type="number" 
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="text-center h-12 text-lg bg-white"
                                />

                                <div className="grid grid-cols-4 gap-3">
                                    {amountShortcuts.map(value => (
                                        <Button 
                                            key={value}
                                            variant="outline"
                                            className="bg-white"
                                            onClick={() => handleAmountClick(value)}
                                        >
                                            ₹ {value}
                                        </Button>
                                    ))}
                                </div>
                                
                                <Select defaultValue="direct-upi">
                                    <SelectTrigger className="bg-white">
                                        <SelectValue placeholder="Select Payment Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="direct-upi">Direct UPI</SelectItem>
                                        <SelectItem value="google-pay">Google Pay</SelectItem>
                                        <SelectItem value="phonepe">PhonePe</SelectItem>
                                        <SelectItem value="paytm">Paytm</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                                    Add Points
                                </Button>
                            </div>
                            
                            <div className="text-center space-y-3 pt-4">
                                <p className="text-sm font-medium">Unable to Add Fund?</p>
                                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 font-bold">
                                    Contact Admin for help
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
