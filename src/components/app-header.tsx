
import { useState } from "react"
import { Trophy, Sun, Moon, User } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <header className="h-16 border-b bg-white dark:bg-gray-900 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">Vakya</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* Sign In/Out Button */}
        <Button
          onClick={() => setIsSignedIn(!isSignedIn)}
          className={
            isSignedIn 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }
        >
          <User className="h-4 w-4 mr-2" />
          {isSignedIn ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </header>
  )
}
