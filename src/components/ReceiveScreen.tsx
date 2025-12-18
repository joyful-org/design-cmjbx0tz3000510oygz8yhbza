import { ArrowLeft, Copy, Share2, Check, QrCode } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"
import { useState } from "react"
import type { Screen } from "../App"

interface ReceiveScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function ReceiveScreen({ onNavigate }: ReceiveScreenProps) {
  const [selectedToken, setSelectedToken] = useState("ETH")
  const [copied, setCopied] = useState(false)
  const address = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD"

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-6 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Receive Crypto</h1>
      </div>

      <div className="flex-1 p-4 space-y-6">
        {/* Token Selection */}
        <div className="space-y-2">
          <Label>Select Token</Label>
          <Select value={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger className="h-14">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="SOL">Solana (SOL)</SelectItem>
              <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* QR Code */}
        <Card className="bg-card">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="bg-background p-4 rounded-2xl mb-4">
              <div className="h-48 w-48 bg-muted rounded-xl flex items-center justify-center">
                <QrCode className="h-32 w-32 text-foreground" />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mb-2">
              Scan this QR code to receive {selectedToken}
            </p>
          </CardContent>
        </Card>

        {/* Address */}
        <div className="space-y-2">
          <Label>Your {selectedToken} Address</Label>
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <p className="text-sm font-mono break-all text-center mb-4">
                {address}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1 h-12">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warning */}
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <p className="text-sm text-center">
              <span className="font-semibold">Important:</span> Only send {selectedToken} to this address. Sending other tokens may result in permanent loss.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
