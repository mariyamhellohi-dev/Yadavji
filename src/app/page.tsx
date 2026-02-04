import {
  ArrowRightLeft,
  Bell,
  CircleDollarSign,
  CircleUser,
  Clock,
  CreditCard,
  Gavel,
  Home,
  IndianRupee,
  ListOrdered,
  LogOut,
  Menu,
  MessageCircleQuestion,
  PlayCircle,
  Star,
  Trophy,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { games } from '@/lib/data'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"


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
  { label: 'Withdraw', icon: IndianRupee, href: '#' },
  { label: 'Support', icon: MessageCircleQuestion, href: '#' },
]

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '#', active: true },
    { label: 'Profile', icon: CircleUser, href: '#' },
    { label: 'My Bids', icon: Gavel, href: '#' },
]

const sidebarNavItems = [
  { label: 'Home', icon: Home, href: '#', active: true },
  { label: 'Bidding History', icon: ListOrdered, href: '#' },
  { label: 'Fund History', icon: CircleDollarSign, href: '#' },
  { label: 'Top Winners', icon: Trophy, href: '#' },
  { label: 'Game Rates', icon: Gavel, href: '#' },
]

export default function HomePage() {
  return (
    <Sheet>
      <div className="bg-background min-h-screen font-sans">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-primary text-black shadow-lg">
            <div className="flex items-center gap-4">
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-black hover:bg-black/10">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <h1 className="text-2xl font-bold">Play Matka Online</h1>
            </div>
            <Button
                variant="outline"
                className="rounded-md bg-white border-yellow-300 text-black h-9 px-4 font-bold"
            >
                ₹ 0
            </Button>
        </header>

        <main className="py-4 pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickActions.map((action) => (
                      <Button
                          key={action.label}
                          variant="default"
                          className="h-12 justify-center bg-primary text-black hover:bg-primary/90 border border-yellow-500 shadow-sm gap-2"
                      >
                          <action.icon className="h-5 w-5" />
                          <span className="text-base font-semibold">{action.label}</span>
                      </Button>
                  ))}
              </div>

              <Card className="bg-primary/80 border-primary shadow-sm overflow-hidden">
                  <CardContent className="p-0 flex items-stretch">
                      <div className="flex items-center justify-center p-4">
                          <Star className="h-6 w-6 text-black"/>
                      </div>
                      <div className="flex-grow text-left py-2 px-4 flex flex-col justify-center">
                          <p className="font-bold text-base uppercase text-black">MUMBAI STARLINE</p>
                          <p className="text-sm text-black/80">Har ghante jito</p>
                      </div>
                      <div className="flex items-center justify-center p-4">
                          <Button className="bg-white text-primary hover:bg-white/90 rounded-md">
                              <PlayCircle className="h-5 w-5 mr-1" />
                              Play Starline
                          </Button>
                      </div>
                  </CardContent>
              </Card>

              <div className="flex items-center gap-4 text-primary">
                  <div className="flex-grow h-px bg-primary/30"></div>
                  <h2 className="text-sm font-semibold tracking-wider text-accent">#1 MATKA PLAY APPLICATION</h2>
                  <div className="flex-grow h-px bg-primary/30"></div>
              </div>

              <div className="space-y-3">
                  {games.map((game) => {
                    const isClosed = game.status === 'Betting is Closed'
                    
                    return (
                    <Card key={game.id} className="bg-card border-border shadow-md overflow-hidden">
                      <CardContent className="p-0 grid grid-cols-[150px_1fr_150px] items-center">
                        <div className="flex items-center justify-center gap-2 p-4 border-r border-border h-full">
                          <Clock className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">Timing</span>
                        </div>
                        
                        <div className="flex-grow text-center py-2 px-4">
                          <p className="font-bold text-base uppercase">{game.name}</p>
                          <p className={`text-xs font-semibold ${isClosed ? 'text-red-500' : 'text-green-600'}`}>{game.status}</p>
                          <p className="font-bold text-2xl text-accent tracking-widest">{game.result}</p>
                        </div>

                        <div className="flex items-center justify-center p-4 border-l border-border h-full">
                          {isClosed ? (
                            <Button disabled variant="outline" className="w-28 bg-gray-200 text-gray-500 border-gray-300 gap-2">
                                <PlayCircle className="h-5 w-5" />
                                <span>Closed</span>
                            </Button>
                          ) : (
                            <Button className="w-28 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                              <PlayCircle className="h-5 w-5" />
                              <span>Play Now</span>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )})}
              </div>
            </div>
        </main>
        
        <Button className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-20">
            <WhatsAppIcon className="h-7 w-7 text-white" />
        </Button>
        
        <footer className="fixed bottom-0 left-0 right-0 z-30 bg-primary text-primary-foreground shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
           <div className="flex justify-around">
              {bottomNavItems.map(item => (
                  <Button key={item.label} variant="ghost" className={`flex-1 flex-col h-16 rounded-none ${item.active ? 'bg-black/20' : ''} hover:bg-black/10 text-primary-foreground border-r border-yellow-500/50 last:border-r-0`}>
                      <item.icon className="h-6 w-6" />
                      <span className="text-xs mt-1">{item.label}</span>
                  </Button>
              ))}
           </div>
        </footer>
      </div>

      <SheetContent side="left" className="p-0 w-[280px] bg-primary text-primary-foreground border-r-0 flex flex-col">
          <SheetHeader className="p-4 border-b border-black/20 text-left space-y-0">
            <SheetTitle className="font-bold text-lg">Azatrum</SheetTitle>
            <SheetDescription className="text-sm text-primary-foreground/80">7111525376</SheetDescription>
          </SheetHeader>
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
            <Button className="w-full bg-black text-white font-bold hover:bg-gray-800">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
      </SheetContent>
    </Sheet>
  )
}
