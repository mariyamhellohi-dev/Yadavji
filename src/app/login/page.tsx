'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (localStorage.getItem('yadavji-user')) {
      router.replace('/')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter both username and password.',
      })
      return
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .eq('password', password)
      .single()

    if (error || !data) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid username or password.',
      })
    } else {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      })
      localStorage.setItem('yadavji-user', JSON.stringify(data))
      router.replace('/')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF6D5] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your unique username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white"
              />
            </div>
            <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90">
              Login
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account?</span>
            <Link href="/signup">
              <Button variant="outline" className="w-full mt-2 border-primary text-primary font-bold">
                Sign Up Here
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
