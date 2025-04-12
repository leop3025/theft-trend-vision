
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  AlertTriangle, 
  BarChart3, 
  Bell, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Cog, 
  Home, 
  LogOut, 
  PackageSearch, 
  PieChart, 
  ShoppingCart, 
  Users 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Sidebar = () => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = React.useState(isMobile);
  const location = useLocation();

  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const menuItems = [
    { name: "Shoplifting Predictive Analysis", icon: Home, path: "/" },
    { name: "Inventory", icon: PackageSearch, path: "/inventory-forecasting" },
    { name: "Settings", icon: Cog, path: "/settings" },
  ];

  return (
    <aside
      className={`bg-sidebar-background text-sidebar-foreground h-screen transition-all duration-300 relative ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {!collapsed && (
          <span className="font-bold text-lg text-sidebar-primary-foreground">
            BillianceAI
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-accent-foreground absolute -right-3 top-7 bg-sidebar-background border border-sidebar-border"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="px-2 py-4">
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-sidebar-primary/20 text-sidebar-primary"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${collapsed ? "justify-center" : "justify-start"}`}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-3">
        <button
          className={`flex items-center rounded-md py-2 px-3 w-full transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};
