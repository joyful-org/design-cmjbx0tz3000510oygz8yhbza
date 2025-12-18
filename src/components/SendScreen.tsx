import { ArrowLeft, Search, Scan, ChevronRight, Wallet } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { ScrollArea } from "../components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useState } from "react"
import type { Screen } from "../App"

interface SendScreenProps {
  onNavigate: (screen: Screen) => void
}

const recentContacts = [
  { name: "Alice", address: "0x1234...5678", initials: "AL" },
  { name: "Bob", address: "0x8765...4321", initials: "BO" },
  { name: "Carol", address: "0xabcd...efgh", initials: "CA" },
]

export default function SendScreen({ onNavigate }: SendScreenProps) {
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [selectedToken, setSelectedToken] = useState("ETH")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-6 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Send Crypto</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Token Selection */}
          <div className="space-y-2">
            <Label>Select Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">₿</span>
                    <span>Bitcoin (0.0234 BTC)</span>
                  </div>
                </SelectItem>
                <SelectItem value="ETH">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Ξ</span>
                    <span>Ethereum (1.456 ETH)</span>
                  </div>
                </SelectItem>
                <SelectItem value="SOL">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">◎</span>
                    <span>Solana (12.89 SOL)</span>
                  </div>
                </SelectItem>
                <SelectItem value="USDC">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">$</span>
                    <span>USD Coin (500.00 USDC)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Amount</Label>
              <Button variant="ghost" size="sm" className="text-primary text-xs h-auto p-0">
                Max
              </Button>
            </div>
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-3xl font-bold border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  />
                  <span className="text-xl font-semibold text-muted-foreground">{selectedToken}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">≈ $0.00 USD</p>
              </CardContent>
            </Card>
          </div>

          {/* Recipient Address */}
          <div className="space-y-2">
            <Label>Recipient Address</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter address or ENS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Scan className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Recent Contacts */}
          <div className="space-y-3">
            <Label>Recent</Label>
            <div className="space-y-2">
              {recentContacts.map((contact) => (
                <Card
                  key={contact.address}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setAddress(contact.address)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {contact.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.address}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-border bg-background">
        <Button className="w-full h-14 text-lg" disabled={!amount || !address}>
          <Wallet className="h-5 w-5 mr-2" />
          Review Transaction
        </Button>
      </div>
    </div>
  )
}
