import {
  Download,
  History,
  Home,
  LifeBuoy,
  LogOut,
  MinusCircle,
  PlusCircle,
  Star,
  Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { GameStatusTable } from '@/components/game-status-table'
import { UserNav } from '@/components/user-nav'

const quickActions = [
  { label: 'Add Fund', icon: PlusCircle, variant: 'default' as const, href: '#' },
  { label: 'Withdraw', icon: MinusCircle, variant: 'outline' as const, href: '#' },
  { label: 'Support', icon: LifeBuoy, variant: 'outline' as const, href: '#' },
  {
    label: 'Download App',
    icon: Download,
    variant: 'outline' as const,
    href: '#',
  },
]

export default function DashboardPage() {
  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="icon"
              className="bg-primary hover:bg-primary/90 rounded-lg shrink-0"
              aria-label="Home"
            >
              <Star className="h-5 w-5 text-primary-foreground" />
            </Button>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <h2 className="font-headline text-lg font-semibold text-sidebar-foreground">
                MatkaMax
              </h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive tooltip="Home">
                <Home />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Bidding History">
                <History />
                Bidding History
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Logout">
                <LogOut />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add search or breadcrumbs here */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto grid w-full max-w-7xl auto-rows-max items-start gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-headline font-bold tracking-tight">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's a quick overview of your account.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Easily manage your funds and get support.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Button
                          key={action.label}
                          variant={action.variant}
                          className="h-20 flex-col gap-2"
                        >
                          <Icon className="h-6 w-6" />
                          <span>{action.label}</span>
                        </Button>
                      )
                    })}
                  </CardContent>
                </Card>

                <GameStatusTable />
              </div>

              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle>Wallet Balance</CardTitle>
                    <Wallet className="w-8 h-8 absolute top-6 right-6 opacity-20" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">1,250 Pts</div>
                    <p className="text-xs text-primary-foreground/80 mt-1">
                      +250 Pts from last week
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
