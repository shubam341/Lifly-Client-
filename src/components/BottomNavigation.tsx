import { Home, ShoppingBag, Plus, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ShoppingBag, label: "Store", path: "/store" },
    { icon: Plus, label: "Add", path: "/upload", isSpecial: true },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: User, label: "Me", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-between px-4 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 h-auto py-2 ${
                item.isSpecial
                  ? "bg-primary text-primary-foreground rounded-full px-4"
                  : isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${item.isSpecial ? "w-5 h-5" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
