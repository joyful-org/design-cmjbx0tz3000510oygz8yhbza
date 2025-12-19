import { ArrowUpRight, ArrowDownLeft, History, Settings, TrendingUp, TrendingDown, Wallet, Eye, EyeOff, Bell, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { ScrollArea } from "../components/ui/scroll-area"
import { useState } from "react"
import type { Screen } from "../App"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

const tokens = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.0234", value: "$2,341.56", change: "+2.4%", positive: true, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", balance: "1.456", value: "$3,892.10", change: "+5.2%", positive: true, icon: "Ξ" },
  { symbol: "SOL", name: "Solana", balance: "12.89", value: "$1,456.78", change: "-1.8%", positive: false, icon: "◎" },
  { symbol: "USDC", name: "USD Coin", balance: "500.00", value: "$500.00", change: "0.0%", positive: true, icon: "$" },
]

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const totalBalance = "$8,190.44"

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <p className="font-semibold">John Doe</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onNavigate("settings")}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Balance Card - Improved Design */}
      <div className="px-4 pb-4">
        <Card className="relative overflow-hidden border-0 shadow-lg">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-primary-foreground/5 rounded-full" />
          
          <CardContent className="relative p-6 text-primary-foreground">
            {/* Top Row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Wallet className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium opacity-90">Main Wallet</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setBalanceVisible(!balanceVisible)}
              >
                {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Balance */}
            <div className="mb-4">
              <p className="text-sm opacity-80 mb-1">Total Balance</p>
              <h1 className="text-4xl font-bold tracking-tight">
                {balanceVisible ? totalBalance : "••••••"}
              </h1>
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary-foreground/15 rounded-full px-3 py-1.5">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+$234.56</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 opacity-80" />
                <span className="text-sm opacity-80">2.94% today</span>
              </div>
            </div>
            
            {/* Quick Actions in Card */}
            <div className="flex gap-2 mt-6 pt-4 border-t border-primary-foreground/20">
              <Button
                variant="ghost"
                className="flex-1 h-12 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground"
                onClick={() => onNavigate("send")}
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button
                variant="ghost"
                className="flex-1 h-12 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground"
                onClick={() => onNavigate("receive")}
              >
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Receive
              </Button>
              <Button
                variant="ghost"
                className="flex-1 h-12 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground"
                onClick={() => onNavigate("activity")}
              >
                <History className="h-4 w-4 mr-2" />
                Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets */}
      <div className="flex-1 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Assets</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            See All
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-3 pb-6">
            {tokens.map((token) => (
              <Card key={token.symbol} className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                        {token.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{token.symbol}</p>
                        <p className="text-sm text-muted-foreground">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{balanceVisible ? token.value : "••••"}</p>
                      <div className="flex items-center justify-end gap-1">
                        {token.positive ? (
                          <TrendingUp className="h-3 w-3 text-primary" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        )}
                        <span className={`text-sm ${token.positive ? "text-primary" : "text-destructive"}`}>
                          {token.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border bg-background px-4 py-3">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2 text-primary">
            <Wallet className="h-5 w-5" />
            <span className="text-xs">Wallet</span>
          </Button>
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2" onClick={() => onNavigate("activity")}>
            <History className="h-5 w-5" />
            <span className="text-xs">Activity</span>
          </Button>
          <Button variant="ghost" className="flex-col gap-1 h-auto py-2" onClick={() => onNavigate("settings")}>
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  )
}