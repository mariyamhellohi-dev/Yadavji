'use client'

import { useParams, useSearchParams } from 'next/navigation'
import {
  ChevronLeft,
  CircleUser,
  Gavel,
  Home,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useWallet } from '@/hooks/use-wallet'
import { PlayCircle } from 'lucide-react'

const SingleAnkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" rx="15" stroke="currentColor" strokeWidth="5"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>
  );
  
const JodiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-15 50 50)">
      <rect x="5" y="5" width="80" height="80" rx="10" stroke="currentColor" strokeWidth="4"/>
      <circle cx="30" cy="30" r="7" fill="currentColor"/>
      <circle cx="70" cy="70" r="7" fill="currentColor"/>
    </g>
    <g transform="translate(30, 0) rotate(15 50 50)">
      <rect x="5" y="5" width="80" height="80" rx="10" stroke="currentColor" strokeWidth="4"/>
      <circle cx="30" cy="70" r="7" fill="currentColor"/>
      <circle cx="70" cy="30" r="7" fill="currentColor"/>
    </g>
  </svg>
);
  
const SinglePattiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.25 2 7 4.25 7 7c0 1.94 1.06 3.63 2.65 4.54L7.9 16.29C6.73 15.65 5.5 15 4 15c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.88 0 3.47-1.3 3.88-3.07L12 17.5l4.12 2.43C16.53 21.7 18.12 23 20 23c2.21 0 4-1.79 4-4s-1.79-4-4-4c-1.5 0-2.73.65-3.59 1.69L14.35 11.54C15.94 10.63 17 8.94 17 7c0-2.75-2.25-5-5-5z"/>
    </svg>
);
  
const DoublePattiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path transform="scale(0.8) translate(-4, 0)" d="M12 2C9.25 2 7 4.25 7 7c0 1.94 1.06 3.63 2.65 4.54L7.9 16.29C6.73 15.65 5.5 15 4 15c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.88 0 3.47-1.3 3.88-3.07L12 17.5l4.12 2.43C16.53 21.7 18.12 23 20 23c2.21 0 4-1.79 4-4s-1.79-4-4-4c-1.5 0-2.73.65-3.59 1.69L14.35 11.54C15.94 10.63 17 8.94 17 7c0-2.75-2.25-5-5-5z"/>
    <path transform="scale(0.8) translate(12, 0)" d="M12 2C9.25 2 7 4.25 7 7c0 1.94 1.06 3.63 2.65 4.54L7.9 16.29C6.73 15.65 5.5 15 4 15c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.88 0 3.47-1.3 3.88-3.07L12 17.5l4.12 2.43C16.53 21.7 18.12 23 20 23c2.21 0 4-1.79 4-4s-1.79-4-4-4c-1.5 0-2.73.65-3.59 1.69L14.35 11.54C15.94 10.63 17 8.94 17 7c0-2.75-2.25-5-5-5z"/>
  </svg>
);
  
const TriplePattiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 40 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path transform="scale(0.7) translate(-8, 2)" d="M12 2C9.25 2 7 4.25 7 7c0 1.94 1.06 3.63 2.65 4.54L7.9 16.29C6.73 15.65 5.5 15 4 15c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.88 0 3.47-1.3 3.88-3.07L12 17.5l4.12 2.43C16.53 21.7 18.12 23 20 23c2.21 0 4-1.79 4-4s-1.79-4-4-4c-1.5 0-2.73.65-3.59 1.69L14.35 11.54C15.94 10.63 17 8.94 17 7c0-2.75-2.25-5-5-5z"/>
      <path transform="scale(0.7) translate(8, 2)" d="M12 2C9.25 2 7 4.25 7 7c0 1.94 1.06 3.63 2.65 4.54L7.9 16.29C6.73 15.65 5.5 15 4 15c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.88 0 3.47-1.3 3.88-3.07L12 17.5l4.12 2.43C16.53 21.7 18.12 23 20 23c2.21 0 4-1.79 4-4s-1.79-4-4-4c-1.5 0-2.73.65-3.59 1.69L14.35 11.54C15.94 10.63 17 8.94 17 7c0-2.75-2.25-5-5-5z"/>
      <path transform="scale(0.7) translate(24, 2)" d="M12 2C9.25 2 7 4.25 7 7c0 1.94 1.06 3.63 2.65 4.54L7.9 16.29C6.73 15.65 5.5 15 4 15c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.88 0 3.47-1.3 3.88-3.07L12 17.5l4.12 2.43C16.53 21.7 18.12 23 20 23c2.21 0 4-1.79 4-4s-1.79-4-4-4c-1.5 0-2.73.65-3.59 1.69L14.35 11.54C15.94 10.63 17 8.94 17 7c0-2.75-2.25-5-5-5z"/>
  </svg>
);
  
const SangamIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7C10.8954 7 10 7.89543 10 9C10 9.7708 10.375 10.4582 10.93 10.86L9.8 13.58C9.28 13.3 8.75 13 8 13C6.89543 13 6 13.8954 6 15C6 16.1046 6.89543 17 8 17C8.94 17 9.735 16.4 9.94 15.54L12 14.5L14.06 15.54C14.265 16.4 15.06 17 16 17C17.1046 17 18 16.1046 18 15C18 13.8954 17.1046 13 16 13C15.25 13 14.72 13.3 14.2 13.58L13.07 10.86C13.625 10.4582 14 9.7708 14 9C14 7.89543 13.1046 7 12 7Z" fill="currentColor"/>
  </svg>
);

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '#'},
    { label: 'Profile', icon: CircleUser, href: '/profile' },
]

export default function GameDashboardPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [walletBalance] = useWallet();

  const gameId = params.gameId as string
  const gameName = searchParams.get('name') || 'Game'

  const bidOptions = [
    { label: 'Single Ank', icon: SingleAnkIcon, href: `/game/${gameId}/single-ank?name=${encodeURIComponent(gameName)}` },
    { label: 'Jodi', icon: JodiIcon, href: `/game/${gameId}/jodi?name=${encodeURIComponent(gameName)}` },
    { label: 'Single Patti', icon: SinglePattiIcon, href: `/game/${gameId}/single-patti?name=${encodeURIComponent(gameName)}` },
    { label: 'Double Patti', icon: DoublePattiIcon, href: `/game/${gameId}/double-patti?name=${encodeURIComponent(gameName)}` },
    { label: 'Triple Patti', icon: TriplePattiIcon, href: `/game/${gameId}/triple-patti?name=${encodeURIComponent(gameName)}` },
    { label: 'Half Sangam', icon: SangamIcon, href: `/game/${gameId}/half-sangam?name=${encodeURIComponent(gameName)}` },
    { label: 'Full Sangam', icon: SangamIcon, href: '#' },
  ]

  return (
    <div className="bg-background min-h-screen font-sans">
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 bg-primary text-black shadow-md">
        <div className="flex items-center gap-2">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon" className="text-black hover:bg-black/10">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            </Link>
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
                <CardContent className="p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-accent uppercase">{gameName} DASHBOARD</h2>
                        <p className="text-sm text-muted-foreground">Select Bidding Option</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {bidOptions.map((option, index) => (
                            <Link href={option.href} key={option.label} passHref>
                                <Card className={`flex flex-col items-center justify-center p-4 h-32 text-purple-800 hover:bg-muted/50 transition-colors cursor-pointer ${index === 6 ? 'md:col-start-2' : ''}`}>
                                    <option.icon className="h-10 w-10 mb-2" />
                                    <span className="text-sm font-semibold text-center">{option.label}</span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-6">Note: Betting is Running Now</p>
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
