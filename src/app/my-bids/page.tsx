'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Wallet, CircleUser, Gavel, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWallet } from '@/hooks/use-wallet'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'

// Define types
type UserSession = {
  user: { id: string; name: string; email: string; mobile: string; };
  wallet: { id: string; user_id: string; balance: number };
}

type Bid = {
    id: string;
    game_name: string;
    bid_type: string;
    amount: number;
    status: 'pending' | 'won' | 'lost';
    session: 'open' | 'close' | null;
    digits: string | null;
    open_ank: string | null;
    close_patti: string | null;
    open_patti: string | null;
    close_ank: string | null;
    created_at: string;
}

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '/my-bids', active: true },
    { label: 'Profile', icon: CircleUser, href: '/profile' },
];


const BidCard = ({ bid }: { bid: Bid }) => {
    const renderBidDetails = () => {
        switch (bid.bid_type) {
            case 'single_ank':
            case 'jodi':
            case 'single_patti':
            case 'double_patti':
            case 'triple_patti':
                return <p>Number: <span className="font-bold">{bid.digits}</span></p>
            case 'half_sangam':
                return (
                    <>
                        {bid.open_ank && <p>Open Ank: <span className="font-bold">{bid.open_ank}</span></p>}
                        {bid.close_patti && <p>Close Patti: <span className="font-bold">{bid.close_patti}</span></p>}
                        {bid.open_patti && <p>Open Patti: <span className="font-bold">{bid.open_patti}</span></p>}
                        {bid.close_ank && <p>Close Ank: <span className="font-bold">{bid.close_ank}</span></p>}
                    </>
                );
            case 'full_sangam':
                return (
                    <>
                        <p>Open Patti: <span className="font-bold">{bid.open_patti}</span></p>
                        <p>Close Patti: <span className="font-bold">{bid.close_patti}</span></p>
                    </>
                );
            default:
                return null;
        }
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'won': return 'default';
            case 'lost': return 'destructive';
            case 'pending': return 'secondary';
            default: return 'outline';
        }
    }

    return (
        <Card>
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                        <div>
                             <p className="font-bold text-base">{bid.game_name}</p>
                             <p className="text-xs text-muted-foreground">
                                {bid.bid_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                {bid.session && ` (${bid.session.toUpperCase()})`}
                            </p>
                        </div>
                        <Badge variant={getStatusVariant(bid.status)} className="capitalize">{bid.status}</Badge>
                    </div>
                    <div className="text-sm text-foreground">
                        {renderBidDetails()}
                    </div>
                     <div className="flex justify-between items-end text-sm">
                        <p className="text-muted-foreground">Amount: <span className="font-bold text-foreground">₹{bid.amount}</span></p>
                        <p className="text-xs text-muted-foreground">{format(new Date(bid.created_at), "dd MMM, hh:mm a")}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default function MyBidsPage() {
    const router = useRouter()
    const supabase = createClient()
    const [walletBalance] = useWallet()
    const [bids, setBids] = useState<Bid[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const sessionRaw = localStorage.getItem('yadavji-user')
        if (sessionRaw) {
            const currentSession = JSON.parse(sessionRaw) as UserSession;

            const fetchBids = async () => {
                if (!currentSession?.user?.id) {
                    router.replace('/login');
                    return;
                }

                const { data, error } = await supabase
                    .from('bids')
                    .select('*')
                    .eq('user_id', currentSession.user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch your bids.' });
                    console.error(error);
                } else if (data) {
                    setBids(data as Bid[]);
                }
                setLoading(false);
            };
            fetchBids();

        } else {
            router.replace('/login')
        }
    }, [router, supabase])

    const { toast } = useToast();

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
                <div className="max-w-4xl mx-auto px-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Bidding History</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {loading ? (
                                <p className="text-center">Loading bids...</p>
                            ) : bids.length > 0 ? (
                                bids.map(bid => <BidCard key={bid.id} bid={bid} />)
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-muted-foreground">You haven't placed any bids yet.</p>
                                    <Button className="mt-4" onClick={() => router.push('/')}>Play Now</Button>
                                </div>
                            )}
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
