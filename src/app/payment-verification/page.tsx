'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { ChevronLeft, Wallet, Home, Gavel, CircleUser } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useWallet } from '@/hooks/use-wallet'

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '/my-bids'},
    { label: 'Profile', icon: CircleUser, href: '/profile' },
]

function PaymentVerificationContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { toast } = useToast()
    const amount = searchParams.get('amount') || '0'
    const [walletBalance] = useWallet();

    const handlePaymentCompleted = () => {
        toast({
            title: 'Request Submitted',
            description: 'Your payment verification is being processed. Points will be added to your wallet shortly.',
        })
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
                        <CardContent className="p-6 space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">Scan & Pay</h2>
                                <p className="text-muted-foreground text-sm">Use any UPI app to scan the QR code and pay.</p>
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-4">
                                <Image 
                                    src="https://picsum.photos/seed/qr-code/300/300"
                                    alt="QR Code for UPI payment"
                                    width={300}
                                    height={300}
                                    className="rounded-lg border-4 border-border"
                                    data-ai-hint="qr code"
                                />
                                <div className="text-center">
                                    <p className="text-lg font-semibold">Amount to Pay</p>
                                    <p className="text-3xl font-bold text-primary">₹ {amount}</p>
                                </div>
                            </div>
                            
                            <div className="text-center space-y-3 pt-4">
                                <p className="text-sm font-medium">After successful payment, click the button below.</p>
                                <Button 
                                    className="w-full h-12 text-lg font-bold bg-green-600 text-white hover:bg-green-700"
                                    onClick={handlePaymentCompleted}
                                >
                                    Payment Completed
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


export default function PaymentVerificationPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <PaymentVerificationContent />
        </Suspense>
    )
}
