import { ArrowLeft, ChevronRight, Shield, Bell, Moon, Globe, HelpCircle, FileText, LogOut, User, Lock, Smartphone } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Separator } from "../components/ui/separator"
import { ScrollArea } from "../components/ui/scroll-area"
import { useState } from "react"
import type { Screen } from "../App"

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true)
  const [biometrics, setBiometrics] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", action: "navigate" },
        { icon: Lock, label: "Security", action: "navigate" },
        { icon: Shield, label: "Recovery Phrase", action: "navigate", badge: "Backup" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", action: "toggle", value: notifications, onChange: setNotifications },
        { icon: Smartphone, label: "Biometric Login", action: "toggle", value: biometrics, onChange: setBiometrics },
        { icon: Moon, label: "Dark Mode", action: "toggle", value: darkMode, onChange: setDarkMode },
        { icon: Globe, label: "Language", action: "navigate", value: "English" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", action: "navigate" },
        { icon: FileText, label: "Terms of Service", action: "navigate" },
        { icon: FileText, label: "Privacy Policy", action: "navigate" },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-6 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Profile Card */}
          <Card className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">John Doe</h2>
                  <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Settings Groups */}
          {settingsGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground px-1">
                {group.title}
              </h3>
              <Card className="bg-card">
                <CardContent className="p-0">
                  {group.items.map((item, index) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.action === "toggle" ? (
                          <Switch
                            checked={item.value as boolean}
                            onCheckedChange={item.onChange as (checked: boolean) => void}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            {item.value && typeof item.value === "string" && (
                              <span className="text-sm text-muted-foreground">
                                {item.value}
                              </span>
                            )}
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      {index < group.items.length - 1 && (
                        <Separator className="ml-16" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Logout Button */}
          <Button variant="destructive" className="w-full h-12">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>

          {/* Version */}
          <p className="text-center text-sm text-muted-foreground pb-4">
            Version 1.0.0
          </p>
        </div>
      </ScrollArea>
    </div>
  )
}
