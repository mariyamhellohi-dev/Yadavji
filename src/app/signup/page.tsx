'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [username, setUsername] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !mobile || !email || !password || !confirmPassword) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill out all fields.' })
        return
    }

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Passwords do not match.',
      })
      return
    }
    
    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
        toast({
            variant: 'destructive',
            title: 'Invalid Mobile Number',
            description: 'Please enter a valid 10-digit mobile number.',
        })
        return
    }

    // Check if username already exists
    const { data: existingUser } = await supabase
        .from('users')
        .select('name')
        .eq('name', username)
        .single();

    if (existingUser) {
        toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description: 'This username is already taken.',
        })
        return;
    }

    const { data: newUser, error: userError } = await supabase.from('users').insert({
      name: username,
      mobile: mobile,
      email: email,
      password: password,
    }).select().single()

    if (userError || !newUser) {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: userError?.message || 'Could not create user.',
      })
      return
    }

    const { error: walletError } = await supabase.from('wallets').insert({
        user_id: newUser.id,
        balance: 0,
    })
    
    if (walletError) {
        toast({
            variant: 'destructive',
            title: 'Registration Incomplete',
            description: `Your user account was created, but we failed to create your wallet. Please contact support. Error: ${walletError.message}`,
        })
        return
    }

    toast({
      title: 'Registration Successful',
      description: 'You can now log in with your credentials.',
    })
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF6D5] px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create Your Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username:</Label>
              <Input
                id="username"
                type="text"
                placeholder="Unique Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="mobile">Mobile Number:</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter 10 Digit Phone Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password:</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90">
              Submit
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account?</span>
            <Link href="/login">
                 <Button variant="outline" className="w-full mt-2 border-primary text-primary font-bold">
                    Login Here
                </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
