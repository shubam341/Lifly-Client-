import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const channels = [
    { name: "For You", category: "main" },
    { name: "Video", category: "main" },
    { name: "Live", category: "secondary" },
    { name: "Series", category: "secondary" },
    { name: "Fashion", category: "secondary" },
    { name: "Food", category: "secondary" },
    { name: "Travel", category: "secondary" },
    { name: "TV & movies", category: "secondary" },
    { name: "Comedy", category: "secondary" },
    { name: "Cartoon", category: "secondary" },
    { name: "Crafts", category: "secondary" },
    { name: "Gaming", category: "secondary" },
    { name: "Nails", category: "secondary" },
    { name: "Music", category: "secondary" },
    { name: "Science", category: "secondary" },
    { name: "Art", category: "secondary" },
    { name: "Love & life", category: "secondary" },
    { name: "Photography", category: "secondary" },
    { name: "Celebrity", category: "secondary" },
    { name: "Cars", category: "secondary" },
    { name: "Painting", category: "secondary" },
    { name: "Home Decor", category: "secondary" },
    { name: "Wallpaper", category: "secondary" },
    { name: "Learning", category: "secondary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Following</h1>
              <p className="text-sm text-muted-foreground">Tap to access the channel</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Edit className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* My Channels */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">My Channels</h2>
          <div className="grid grid-cols-2 gap-4">
            {channels.filter(channel => channel.category === "main").map((channel) => (
              <Button
                key={channel.name}
                variant="outline"
                className="h-12 justify-start bg-card"
              >
                {channel.name}
              </Button>
            ))}
            {channels.filter(channel => channel.category === "secondary").slice(0, 22).map((channel) => (
              <Button
                key={channel.name}
                variant="ghost"
                className="h-12 justify-start text-muted-foreground hover:text-foreground"
              >
                {channel.name}
              </Button>
            ))}
          </div>
        </div>

        {/* More Channels */}
        <div>
          <h2 className="text-lg font-semibold mb-4">More Channels</h2>
          <p className="text-sm text-muted-foreground">Tap to add more channels</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;