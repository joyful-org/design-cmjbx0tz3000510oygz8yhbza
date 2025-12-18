import { ArrowLeft, ArrowUpRight, ArrowDownLeft, RefreshCw, Filter } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ScrollArea } from "../components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import type { Screen } from "../App"

interface ActivityScreenProps {
  onNavigate: (screen: Screen) => void
}

const transactions = [
  {
    id: "1",
    type: "send",
    token: "ETH",
    amount: "-0.5",
    value: "$1,234.56",
    address: "0x1234...5678",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: "2",
    type: "receive",
    token: "BTC",
    amount: "+0.01",
    value: "$456.78",
    address: "0x8765...4321",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: "3",
    type: "swap",
    token: "SOL → USDC",
    amount: "10 SOL",
    value: "$1,100.00",
    address: "",
    time: "1 day ago",
    status: "completed",
  },
  {
    id: "4",
    type: "send",
    token: "USDC",
    amount: "-100",
    value: "$100.00",
    address: "0xabcd...efgh",
    time: "2 days ago",
    status: "pending",
  },
  {
    id: "5",
    type: "receive",
    token: "ETH",
    amount: "+0.25",
    value: "$678.90",
    address: "0x9999...8888",
    time: "3 days ago",
    status: "completed",
  },
]

export default function ActivityScreen({ onNavigate }: ActivityScreenProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="h-5 w-5" />
      case "receive":
        return <ArrowDownLeft className="h-5 w-5" />
      case "swap":
        return <RefreshCw className="h-5 w-5" />
      default:
        return null
    }
  }

  const getIconBg = (type: string) => {
    switch (type) {
      case "send":
        return "bg-destructive/10 text-destructive"
      case "receive":
        return "bg-primary/10 text-primary"
      case "swap":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted"
    }
  }

  const TransactionList = ({ filter }: { filter?: string }) => {
    const filtered = filter
      ? transactions.filter((t) => t.type === filter)
      : transactions

    return (
      <div className="space-y-3">
        {filtered.map((tx) => (
          <Card key={tx.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getIconBg(tx.type)}`}>
                    {getIcon(tx.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold capitalize">{tx.type}</p>
                      {tx.status === "pending" && (
                        <Badge variant="secondary" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tx.address || tx.token}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.type === "receive" ? "text-primary" : ""}`}>
                    {tx.amount} {tx.type !== "swap" && tx.token}
                  </p>
                  <p className="text-sm text-muted-foreground">{tx.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Activity</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="send" className="flex-1">Sent</TabsTrigger>
            <TabsTrigger value="receive" className="flex-1">Received</TabsTrigger>
            <TabsTrigger value="swap" className="flex-1">Swaps</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="all" className="m-0">
              <TransactionList />
            </TabsContent>
            <TabsContent value="send" className="m-0">
              <TransactionList filter="send" />
            </TabsContent>
            <TabsContent value="receive" className="m-0">
              <TransactionList filter="receive" />
            </TabsContent>
            <TabsContent value="swap" className="m-0">
              <TransactionList filter="swap" />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
