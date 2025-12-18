import { ArrowUpRight, ArrowDownLeft, History, Settings, TrendingUp, TrendingDown, Wallet, Eye, EyeOff, Bell } from "lucide-react"
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

      {/* Balance Card */}
      <div className="px-4 pb-4">
        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Total Balance</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setBalanceVisible(!balanceVisible)}
              >
                {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            <h1 className="text-4xl font-bold mb-1">
              {balanceVisible ? totalBalance : "••••••"}
            </h1>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+$234.56 (2.94%) today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-6">
        <div className="flex gap-3">
          <Button
            className="flex-1 h-14 flex-col gap-1"
            onClick={() => onNavigate("send")}
          >
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-xs">Send</span>
          </Button>
          <Button
            className="flex-1 h-14 flex-col gap-1"
            variant="secondary"
            onClick={() => onNavigate("receive")}
          >
            <ArrowDownLeft className="h-5 w-5" />
            <span className="text-xs">Receive</span>
          </Button>
          <Button
            className="flex-1 h-14 flex-col gap-1"
            variant="outline"
            onClick={() => onNavigate("activity")}
          >
            <History className="h-5 w-5" />
            <span className="text-xs">Activity</span>
          </Button>
        </div>
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
