
import { useState } from "react"
import { Trophy, Sun, Moon, User, Menu } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <header className="h-16 border-b border-green-200/50 dark:border-green-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="group">
          <SidebarTrigger className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-200 hover:scale-105">
            <Menu className="h-5 w-5 text-green-600 dark:text-green-400" />
          </SidebarTrigger>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl shadow-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">
            Vakya
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-200 hover:scale-105"
        >
          {theme === "light" ? 
            <Moon className="h-5 w-5 text-green-600 dark:text-green-400" /> : 
            <Sun className="h-5 w-5 text-green-600 dark:text-green-400" />
          }
        </Button>

        <Button
          onClick={() => setIsSignedIn(!isSignedIn)}
          className={`rounded-full transition-all duration-200 hover:scale-105 shadow-lg ${
            isSignedIn 
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white" 
              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          }`}
        >
          <User className="h-4 w-4 mr-2" />
          {isSignedIn ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </header>
  )
}
