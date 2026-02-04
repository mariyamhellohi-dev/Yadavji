import {
  CircleUser,
  Clock,
  CreditCard,
  Gavel,
  HelpCircle,
  Home,
  IndianRupee,
  LogOut,
  Menu,
  PlayCircle,
  Wallet,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { games } from '@/lib/data'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"


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
  { label: 'Support', icon: HelpCircle, href: '#' },
]

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '#', active: true },
    { label: 'Bids', icon: Gavel, href: '#'},
    { label: 'Profile', icon: CircleUser, href: '#' },
]

const sidebarNavItems = [
  { label: 'Home', icon: Home, href: '#', active: true },
  { label: 'My Profile', icon: CircleUser, href: '#' },
  { label: 'My Bids', icon: Gavel, href: '#'},
  { label: 'Wallet', icon: Wallet, href: '#' },
  { label: 'Game Rates', icon: Gavel, href: '#' },
  { label: 'How to Play', icon: PlayCircle, href: '#' },
]

export default function HomePage() {
  return (
    <Sheet>
      <div className="bg-background min-h-screen font-sans">
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 bg-primary text-black shadow-md">
            <div className="flex items-center gap-2">
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-black hover:bg-black/10">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <h1 className="text-xl font-bold">YadavJi Khel</h1>
            </div>
            <Button
                variant="outline"
                className="rounded-full bg-white border-yellow-300 text-black h-9 px-4 font-semibold flex items-center gap-2"
            >
                <Wallet className="h-5 w-5" />
                <span>₹ 5,240.00</span>
            </Button>
        </header>

        <main className="py-4 pb-24">
            <div className="max-w-7xl mx-auto px-4 space-y-4">
              
              <div className="grid grid-cols-3 gap-3">
                  {quickActions.map((action) => (
                      <Button
                          key={action.label}
                          variant="outline"
                          className="h-20 flex-col justify-center bg-card border-border shadow-sm gap-1"
                      >
                          <action.icon className="h-6 w-6 text-primary" />
                          <span className="text-xs font-medium text-foreground">{action.label}</span>
                      </Button>
                  ))}
              </div>

              <div className="flex items-center gap-4 py-2">
                  <div className="flex-grow h-px bg-border"></div>
                  <h2 className="text-sm font-semibold tracking-wider text-accent uppercase">#1 YadavJi Khel APPLICATION</h2>
                  <div className="flex-grow h-px bg-border"></div>
              </div>

              <div className="space-y-3">
                  {games.map((game) => {
                    const isClosed = game.status === 'Betting is Closed'
                    
                    return (
                    <Dialog key={game.id}>
                      <Card className="bg-card border-border shadow-md overflow-hidden">
                        <CardContent className="p-0 grid grid-cols-[120px_1fr_120px] items-center">
                          <DialogTrigger asChild>
                            <div className="flex items-center justify-center gap-2 p-4 border-r border-border h-full cursor-pointer hover:bg-muted/50 transition-colors">
                              <Clock className="h-5 w-5 text-primary" />
                              <span className="text-sm font-medium">Timing</span>
                            </div>
                          </DialogTrigger>
                          
                          <div className="flex-grow text-center py-2 px-4">
                            <p className="font-bold text-sm uppercase">{game.name}</p>
                            <p className={`text-xs font-semibold ${isClosed ? 'text-red-500' : 'text-green-600'}`}>{game.status}</p>
                            <p className="font-bold text-2xl text-accent tracking-widest">{game.result}</p>
                          </div>

                          <div className="flex items-center justify-center p-4 border-l border-border h-full">
                            {isClosed ? (
                              <Button disabled variant="outline" className="w-24 h-10 bg-gray-200 text-gray-500 border-gray-300 gap-1.5 rounded-full">
                                  <PlayCircle className="h-5 w-5" />
                                  <span className="text-xs font-bold">Closed</span>
                              </Button>
                            ) : (
                              <Button className="w-24 h-10 bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 rounded-full">
                                <PlayCircle className="h-5 w-5" />
                                <span className="text-xs font-bold">Play Now</span>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      <DialogContent className="max-w-md p-0">
                        <div className="bg-primary p-4 flex justify-between items-center rounded-t-lg">
                          <DialogTitle className="text-lg font-bold text-black uppercase">{game.name}</DialogTitle>
                          <DialogClose asChild>
                            <button className="text-black opacity-70 hover:opacity-100">
                              <X className="h-5 w-5" />
                            </button>
                          </DialogClose>
                        </div>
                        <div className="p-6 space-y-4 text-sm">
                          <div className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center gap-3">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>Open Bid Ends</span>
                            </div>
                            <span className="font-semibold">{game.timing.openBidEnds}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center gap-3">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>Close Bid Ends</span>
                            </div>
                            <span className="font-semibold">{game.timing.closeBidEnds}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center gap-3">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>Open Result</span>
                            </div>
                            <span className="font-semibold">{game.timing.openResult}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Clock className="h-4 w-4 text-primary" />
                              <span>Close Result</span>
                            </div>
                            <span className="font-semibold">{game.timing.closeResult}</span>
                          </div>
                        </div>
                        <div className="flex justify-end p-6 pt-0">
                          <DialogClose asChild>
                            <Button className="bg-primary text-black hover:bg-primary/90 font-bold">Close</Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )})}
              </div>
            </div>
        </main>
        
        <Button className="fixed bottom-20 right-4 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-20">
            <WhatsAppIcon className="h-7 w-7 text-white" />
        </Button>
        
        <footer className="fixed bottom-0 left-0 right-0 z-30 bg-primary text-primary-foreground shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
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
          <SheetHeader className="p-4 border-b border-black/20 text-left space-y-0.5 relative">
            <SheetTitle className="font-bold text-lg">YadavJi Khel</SheetTitle>
            <SheetDescription className="text-sm text-primary-foreground/80">7111525376</SheetDescription>
             <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="absolute top-3 right-2 text-black hover:bg-black/10">
                    <X className="h-5 w-5" />
                </Button>
            </SheetTrigger>
          </SheetHeader>
          <nav className="flex-grow p-2 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarNavItems.map(item => (
                <li key={item.label}>
                  <a href={item.href} className={`flex items-center gap-3 p-3 rounded-md transition-colors ${item.active ? 'bg-black/20' : 'hover:bg-black/10'}`}>
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium text-sm">{item.label}</span>
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
