
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
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <GeminiIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Vakya
          </h1>
          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium">
            AI Powered
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? 
            <Moon className="h-5 w-5" /> : 
            <Sun className="h-5 w-5" />
          }
        </Button>

        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
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
              <DropdownMenuItem>
                <User className="mr-3 h-4 w-4" />
                <span>Profile & Stats</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-3 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-3 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-3 h-4 w-4" />
                <span>Privacy & Security</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-3 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsSignedIn(false)} className="text-destructive">
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => setIsSignedIn(!isSignedIn)}>
            <User className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        )}
      </div>
    </header>
  )
}
