
import { useState } from "react"
import { Sun, Moon, User, Settings, LogOut, HelpCircle, Shield, Bell } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Gemini-style icon component
const GeminiIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7v10l10 5 10-5V7l-10-5z"
      fill="url(#gemini-gradient)"
      stroke="currentColor"
      strokeWidth="1"
    />
    <defs>
      <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285f4" />
        <stop offset="50%" stopColor="#34a853" />
        <stop offset="100%" stopColor="#fbbc04" />
      </linearGradient>
    </defs>
  </svg>
)

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <header className="h-16 border-b border-green-200/50 dark:border-green-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-200 hover:scale-105" />
        
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 p-2.5 rounded-xl shadow-lg">
            <GeminiIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">
            Vakya
          </h1>
          <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full font-medium">
            Powered by GPT-4
          </span>
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

        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback className="bg-green-500 text-white">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Privacy</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsSignedIn(false)}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => setIsSignedIn(!isSignedIn)}
            className="rounded-full transition-all duration-200 hover:scale-105 shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          >
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
