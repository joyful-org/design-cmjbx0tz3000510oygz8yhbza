import { useState } from "react"
import HomeScreen from "./components/HomeScreen"
import SendScreen from "./components/SendScreen"
import ReceiveScreen from "./components/ReceiveScreen"
import ActivityScreen from "./components/ActivityScreen"
import SettingsScreen from "./components/SettingsScreen"

export type Screen = "home" | "send" | "receive" | "activity" | "settings"

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "send":
        return <SendScreen onNavigate={setCurrentScreen} />
      case "receive":
        return <ReceiveScreen onNavigate={setCurrentScreen} />
      case "activity":
        return <ActivityScreen onNavigate={setCurrentScreen} />
      case "settings":
        return <SettingsScreen onNavigate={setCurrentScreen} />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderScreen()}
    </div>
  )
}

export default App
