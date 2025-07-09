
import { Home, BookOpen, Mic, User } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Learn", url: "/learn", icon: BookOpen },
  { title: "Debate", url: "/debate", icon: Mic },
  { title: "Profile", url: "/profile", icon: User },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar 
      className="border-r border-border/50 bg-sidebar-background/95 backdrop-blur-md shadow-xl animate-slide-up"
      collapsible="icon"
    >
      <SidebarContent className="pt-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold text-sm mb-4 px-4">
            🚀 Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `group flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 mx-2 hover-lift relative overflow-hidden ${
                          isActive 
                            ? "bg-gradient-to-r from-primary to-accent-emerald text-white shadow-lg animate-glow-pulse" 
                            : "hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground hover:shadow-md"
                        }`
                      }
                    >
                      <item.icon className={`h-5 w-5 min-w-5 transition-transform duration-300 group-hover:scale-110 ${
                        item.title === 'Home' && '🏠' ||
                        item.title === 'Learn' && '📚' ||
                        item.title === 'Debate' && '🎤' ||
                        item.title === 'Profile' && '👤'
                      }`} />
                      <span className="whitespace-nowrap font-medium tracking-wide">
                        {item.title}
                      </span>
                      {/* Hover accent */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Professional separator */}
        <div className="mt-8 mx-4 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        
        {/* Motivational section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-primary font-semibold text-sm mb-3 px-4 flex items-center">
            💡 Daily Motivation
          </SidebarGroupLabel>
          <div className="px-4 py-2">
            <div className="bg-gradient-to-r from-primary/10 to-accent-emerald/10 rounded-lg p-3 border border-primary/20">
              <div className="text-sm text-foreground font-medium mb-1">
                "Success is not final, failure is not fatal: it is the courage to continue that counts."
              </div>
              <div className="text-xs text-muted-foreground">- Winston Churchill</div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
