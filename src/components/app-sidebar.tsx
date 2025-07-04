
import { useState } from "react"
import { Home, BookOpen, Mic, User, Trophy, Settings, Sun, Moon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Learn", url: "/learn", icon: BookOpen },
  { title: "Debate", url: "/debate", icon: Mic },
  { title: "Profile", url: "/profile", icon: User },
]

export function AppSidebar() {
  const { collapsed } = useSidebar()
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const [isSignedIn, setIsSignedIn] = useState(false)
  
  const currentPath = location.pathname
  const isActive = (path: string) => currentPath === path

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r bg-green-50 dark:bg-green-950`}>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 p-2 rounded-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-green-700 dark:text-green-300">Vakya</h1>
              <p className="text-sm text-green-600 dark:text-green-400">Debate Arena</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-600 dark:text-green-400">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-green-500 text-white" 
                            : "hover:bg-green-100 dark:hover:bg-green-900 text-green-700 dark:text-green-300"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-3">
        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-full justify-start border-green-200 dark:border-green-800"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          {!collapsed && (
            <span className="ml-2">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          )}
        </Button>

        {/* Sign In/Out Button */}
        <Button
          onClick={() => setIsSignedIn(!isSignedIn)}
          className={`w-full justify-start ${
            isSignedIn 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          <User className="h-4 w-4" />
          {!collapsed && (
            <span className="ml-2">
              {isSignedIn ? "Sign Out" : "Sign In"}
            </span>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
