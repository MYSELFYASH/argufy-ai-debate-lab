
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
      className="border-r bg-white/95 dark:bg-gray-900/95 backdrop-blur-md group hover:w-64 transition-all duration-300 ease-in-out shadow-lg"
      collapsible="icon"
    >
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
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
                        `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 mx-2 my-1 ${
                          isActive 
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105" 
                            : "hover:bg-green-100 dark:hover:bg-green-900 text-green-700 dark:text-green-300 hover:scale-105 hover:shadow-md"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 min-w-5" />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
