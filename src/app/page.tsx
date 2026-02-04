import {
  ArrowDownCircle,
  BookOpen,
  CircleUser,
  Clock,
  CreditCard,
  History,
  Home,
  Menu,
  MessageCircleQuestion,
  Megaphone,
  PlayCircle,
  Smartphone,
  Star,
  Wallet,
  XCircle,
  ListOrdered,
  ArrowRightLeft,
  CircleDollarSign,
  Trophy,
  Bell,
  Gavel,
  Download,
  LogOut,
  IndianRupee,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { games } from '@/lib/data'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"


function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

const quickActions = [
  { label: 'Add Fund', icon: CreditCard, href: '#' },
  { label: 'Withdraw', icon: ArrowDownCircle, href: '#' },
  { label: 'Support', icon: MessageCircleQuestion, href: '#' },
  { label: 'Download App', icon: Smartphone, href: '#' },
]

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '#', active: true },
    { label: 'History', icon: History, href: '#' },
    { label: 'Profile', icon: CircleUser, href: '#' },
    { label: 'Passbook', icon: BookOpen, href: '#' },
    { label: 'My Bids', icon: IndianRupee, href: '#' },
]

const sidebarNavItems = [
  { label: 'Home', icon: Home, href: '#', active: true },
  { label: 'Bidding History', icon: ListOrdered, href: '#' },
  { label: 'Starline Bid History', icon: ListOrdered, href: '#' },
  { label: 'Transaction History', icon: ArrowRightLeft, href: '#' },
  { label: 'Fund History', icon: CircleDollarSign, href: '#' },
  { label: 'Top Winners', icon: Trophy, href: '#' },
  { label: 'Starline Winners', icon: Trophy, href: '#' },
  { label: 'Notifications', icon: Bell, href: '#' },
  { label: 'Game Rates', icon: Gavel, href: '#' },
  { label: 'Download App', icon: Download, href: '#' },
]

export default function HomePage() {
  return (
    <Sheet>
      <div className="max-w-md mx-auto bg-background min-h-screen font-sans">
        <header className="sticky top-0 z-20 flex items-center justify-between p-3 bg-primary text-primary-foreground shadow-md">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <h1 className="text-xl font-bold">Matka Master</h1>
          <Button
            variant="secondary"
            className="rounded-full bg-black/10 border border-white/50 h-9 px-4"
          >
            <Wallet className="h-4 w-4 mr-2" />₹ 5,240.00
          </Button>
        </header>

        <main className="p-3 pb-24 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-20 flex-col gap-1 border-primary bg-secondary text-foreground hover:bg-secondary/80"
              >
                <action.icon className="h-6 w-6" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>

          <div className="bg-pink-100 text-red-600 p-2 rounded-lg text-sm flex items-center">
            <Megaphone className="h-5 w-5 mr-2 shrink-0" />
            <p className="truncate">
              !!! URGENT! URGENT! URGENT! Welcome to Matka Master...
            </p>
          </div>
          
          <Card className="bg-primary/80 border-primary shadow-sm">
            <CardContent className="p-2 flex justify-between items-center">
               <div className="flex items-center gap-2 text-primary-foreground">
                  <Star className="h-6 w-6"/>
                  <div>
                      <p className="font-bold">MUMBAI STARLINE</p>
                      <p className="text-xs">Har ghante jito</p>
                  </div>
               </div>
               <Button className="bg-white text-primary hover:bg-white/90 rounded-full">
                  <PlayCircle className="h-5 w-5 mr-1" />
                  Play Starline
               </Button>
            </CardContent>
          </Card>


          <div className="flex items-center gap-4 text-primary">
            <div className="flex-grow h-px bg-primary/30"></div>
            <h2 className="text-sm font-semibold tracking-wider">#1 MATKA PLAY APPLICATION</h2>
            <div className="flex-grow h-px bg-primary/30"></div>
          </div>

          <div className="space-y-2">
            {games.map((game) => {
              const isClosed = game.status === 'Betting is Closed'
              
              return (
              <Card key={game.id} className="bg-card border-border shadow-md overflow-hidden">
                <CardContent className="p-0 flex items-stretch">
                  <div className="flex flex-col items-center justify-center p-2 border-r border-border">
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-border">
                      <Clock className="h-6 w-6 text-primary" />
                    </Button>
                    <span className="text-xs mt-1">Timing</span>
                  </div>
                  
                  <div className="flex-grow text-center py-2 px-4">
                    <p className="font-bold text-base uppercase">{game.name}</p>
                    <p className={`text-xs ${isClosed ? 'text-red-500' : 'text-green-600'}`}>{game.status}</p>
                    <p className="font-bold text-2xl text-accent tracking-widest">{game.result}</p>
                  </div>

                  <div className="flex items-center justify-center p-2 border-l border-border">
                    {isClosed ? (
                       <Button disabled className="h-14 w-14 rounded-full flex-col p-1 bg-gray-200 text-gray-500">
                          <XCircle className="h-6 w-6" />
                          <span className="text-[10px] leading-tight">Closed</span>
                      </Button>
                    ) : (
                      <Button className="h-14 w-14 rounded-full flex-col p-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        <PlayCircle className="h-6 w-6" />
                        <span className="text-[10px] leading-tight">Play Now</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>
        </main>
        
        <Button className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-20">
          <WhatsAppIcon className="h-7 w-7 text-white" />
        </Button>
        
        <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-primary text-primary-foreground shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
           <div className="flex justify-around">
              {bottomNavItems.map(item => (
                  <Button key={item.label} variant="ghost" className={`flex-1 flex-col h-16 rounded-none ${item.active ? 'bg-black/20' : ''} hover:bg-black/10 text-primary-foreground`}>
                      <item.icon className="h-6 w-6" />
                      <span className="text-xs mt-1">{item.label}</span>
                  </Button>
              ))}
           </div>
        </footer>
      </div>

      <SheetContent side="left" className="p-0 w-[280px] bg-primary text-primary-foreground border-r-0 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-black/20">
            <div>
              <p className="font-bold text-lg">Azatrum</p>
              <p className="text-sm opacity-80">7111525376</p>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-black/20 hover:bg-black/30">
                <XCircle className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
          <nav className="flex-grow p-2 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarNavItems.map(item => (
                <li key={item.label}>
                  <a href={item.href} className={`flex items-center gap-3 p-3 rounded-md transition-colors ${item.active ? 'bg-black/20' : 'hover:bg-black/10'}`}>
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 mt-auto border-t border-black/10">
            <Button className="w-full bg-black text-primary-foreground font-bold hover:bg-gray-800">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
      </SheetContent>
    </Sheet>
  )
}
