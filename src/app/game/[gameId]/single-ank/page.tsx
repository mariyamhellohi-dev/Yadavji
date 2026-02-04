'use client'

import { useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Wallet, Trash2, CircleUser, Gavel, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'

const bottomNavItems = [
    { label: 'Home', icon: Home, href: '/', active: false },
    { label: 'Bids', icon: Gavel, href: '#'},
    { label: 'Profile', icon: CircleUser, href: '#' },
]

type Bid = {
    digit: string;
    points: string;
    id: number;
}

export default function SingleAnkPage() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()

    const gameName = searchParams.get('name') || 'Game'

    const [digit, setDigit] = useState('')
    const [points, setPoints] = useState('')
    const [bids, setBids] = useState<Bid[]>([])

    const handleAddBid = () => {
        if (digit.length === 1 && parseInt(digit) >= 0 && parseInt(digit) <= 9 && points && parseInt(points) > 0) {
            setBids([...bids, { digit, points, id: Date.now() }])
            setDigit('')
            setPoints('')
        }
    }

    const handleDeleteBid = (id: number) => {
        setBids(bids.filter(bid => bid.id !== id))
    }

    const totalPoints = bids.reduce((sum, bid) => sum + parseInt(bid.points), 0)

    const today = format(new Date(), 'dd/MM/yyyy')

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
                    <span>₹ 5,240.00</span>
                </Button>
            </header>

            <main className="py-4 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                    <Card className="bg-card border-border shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl text-center text-accent uppercase">{gameName} - Single Ank</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4 items-center">
                                <Input value={today} readOnly className="text-center font-semibold text-purple-800" />
                                <Select defaultValue="open">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Session" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">{gameName} OPEN</SelectItem>
                                        <SelectItem value="close">{gameName} CLOSE</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="text-center text-muted-foreground text-sm">Enter Ank and Points</div>

                            <div className="flex items-center gap-4">
                                <Input 
                                    type="number" 
                                    placeholder="Digit (0-9)"
                                    value={digit}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 1 && /^[0-9]*$/.test(e.target.value)) {
                                            setDigit(e.target.value)
                                        }
                                    }}
                                />
                                <Input 
                                    type="number" 
                                    placeholder="Points"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
                                />
                                <Button onClick={handleAddBid}>Add</Button>
                            </div>

                            {bids.length > 0 && (
                                <div className="space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ank</TableHead>
                                                <TableHead>Points</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {bids.map(bid => (
                                                <TableRow key={bid.id}>
                                                    <TableCell>{bid.digit}</TableCell>
                                                    <TableCell>{bid.points}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteBid(bid.id)}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <div className="text-right font-bold">
                                        Total Points: {totalPoints}
                                    </div>
                                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Submit Bids</Button>
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
