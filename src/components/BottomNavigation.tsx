import { useLocation, useNavigate } from "react-router-dom";
import { Users, Calendar, MessageCircle, Bell, User, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/contexts/NotificationContext";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadConversations, pendingRequests, profileNotifications } = useNotifications();

  const navItems = [
    {
      id: "discover",
      label: "Discover",
      icon: Compass,
      path: "/discover",
    },
    {
      id: "proximity",
      label: "Nearby",
      icon: Users,
      path: "/proximity",
    },
    {
      id: "availability",
      label: "Available",
      icon: Calendar,
      path: "/availability",
    },
    {
      id: "chats",
      label: "Chats",
      icon: MessageCircle,
      path: "/chats",
    },
    {
      id: "requests",
      label: "Requests",
      icon: Bell,
      path: "/requests",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        // Determine notification count and visibility for each icon
        let notificationCount = 0;
        let showNotification = false;
        let showDotOnly = false;
        
        if (item.id === "chats" && unreadConversations > 0) {
          notificationCount = unreadConversations;
          showNotification = true;
        } else if (item.id === "requests" && pendingRequests > 0) {
          showNotification = true;
          showDotOnly = true;
        }
        
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={cn("nav-item", isActive && "active")}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <div className="relative">
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all duration-200"
              />
              {showNotification && (
                <>
                  {showDotOnly ? (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                  ) : (
                    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-[10px] text-white font-bold">
                        {notificationCount}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
            <span className={cn(
              "text-[11px] font-medium transition-all duration-200",
              isActive ? "opacity-100" : "opacity-70"
            )}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;