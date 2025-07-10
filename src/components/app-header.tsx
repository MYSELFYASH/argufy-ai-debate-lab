
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
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 animate-slide-up">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="p-2 rounded-xl hover-lift hover-glow transition-all duration-300" />
        
        <div className="flex items-center space-x-3 animate-bounce-in">
          <div className="bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 p-2.5 rounded-xl shadow-lg hover-bounce animate-sparkle">
            <GeminiIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-emerald bg-clip-text text-transparent">
            Vakya
          </h1>
          <span className="text-xs bg-gradient-to-r from-accent-sapphire to-accent-emerald text-white px-3 py-1.5 rounded-full font-medium shadow-lg animate-glow-pulse">
            AI Powered
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full hover-scale hover-glow"
        >
          {theme === "light" ? 
            <Moon className="h-5 w-5 text-primary animate-spin" style={{ animationDuration: '3s' }} /> : 
            <Sun className="h-5 w-5 text-accent-gold animate-pulse" />
          }
        </Button>

        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-lift">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent-emerald text-white font-bold">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 animate-slide-up card-professional" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent-emerald text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        Premium Member
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    john.doe@example.com
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover-lift cursor-pointer">
                <User className="mr-3 h-4 w-4 text-accent-emerald" />
                <span>Profile & Stats</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover-lift cursor-pointer">
                <Settings className="mr-3 h-4 w-4 text-accent-sapphire" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover-lift cursor-pointer">
                <Bell className="mr-3 h-4 w-4 text-accent-gold" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover-lift cursor-pointer">
                <Shield className="mr-3 h-4 w-4 text-accent-ruby" />
                <span>Privacy & Security</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover-lift cursor-pointer">
                <HelpCircle className="mr-3 h-4 w-4 text-primary" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsSignedIn(false)} className="hover-lift cursor-pointer text-destructive">
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => setIsSignedIn(!isSignedIn)}
            className="btn-gaming hover-lift hover-glow px-6 py-2 rounded-full font-semibold shadow-lg"
          >
            <User className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        )}
      </div>
    </header>
  )
}
