import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search as SearchIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("top");

  // Dummy data for Editor's Picks (unchanged)
  const editorPicks = [
    {
      id: 1,
      title: "Clean Girl Routine",
      subtitle: "Clean Girl Routine",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      category: "Lifestyle"
    },
    {
      id: 2,
      title: "Evening Routine",
      subtitle: "Evening Routine",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
      category: "Beauty"
    }
  ];

  // Dummy categories (unchanged)
  const categories = [
    {
      id: 1,
      title: "Home Finds",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Healthy Habits",
      image: "https://images.unsplash.com/photo-1506629905607-45cb19074bd4?w=200&h=150&fit=crop"
    }
  ];

  // Popular hashtags (unchanged)
  const popularHashtags = [
    { name: "Lemon8Diary", views: "493.2M views" },
    { name: "OutfitInspo", views: "245.1M views" },
    { name: "SelfCare", views: "189.5M views" }
  ];

  // Top tab content (unchanged)
  const topContent = [
    {
      id: 1,
      title: "How to make your iPhone notifications Pink 🩷",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&h=400&fit=crop",
      user: "aesthetictech"
    },
    {
      id: 2,
      title: "iPhone tricks you didn't know about part 3",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=500&fit=crop",
      user: "techtips"
    },
    {
      id: 3,
      title: "2000s outfit aesthetic vibes",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=350&fit=crop",
      user: "y2kfashion"
    },
    {
      id: 4,
      title: "Clean girl morning routine essentials",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=450&fit=crop",
      user: "skincare_guru"
    }
  ];

  // Expanded Accounts dummy data
  const accounts = [
    {
      id: 1,
      username: "cleangirlroutine",
      name: "Clean Girl Aesthetic",
      followers: "2.3M",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      username: "lemon8diary",
      name: "Lemon8Diary",
      followers: "493.2K",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      username: "iphonehacks",
      name: "iPhone Tips & Tricks",
      followers: "1.1M",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      username: "homevibes",
      name: "Home Decoration",
      followers: "850K",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      username: "traveldiaries",
      name: "Travel Diaries ✈️",
      followers: "1.7M",
      avatar: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  // Expanded Hashtags dummy data
  const hashtags = [
    { id: 1, tag: "#cleangirl", posts: "2.1M posts", trending: true },
    { id: 2, tag: "#iphonehacks", posts: "856K posts", trending: true },
    { id: 3, tag: "#2000saesthetic", posts: "1.5M posts", trending: false },
    { id: 4, tag: "#homevibes", posts: "934K posts", trending: false },
    { id: 5, tag: "#healthyhabits", posts: "1.2M posts", trending: true },
    { id: 6, tag: "#morningroutine", posts: "3.4M posts", trending: false },
    { id: 7, tag: "#travelgram", posts: "4.8M posts", trending: true }
  ];

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search Bar */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center space-x-3 p-4">
          {/* Back button */}
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Search input with button */}
          <div className="flex-1 relative">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full bg-muted border-0 focus-visible:ring-1 pr-16"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={handleSearch}
            >
              <SearchIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0">
            <TabsTrigger value="top" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground text-muted-foreground data-[state=active]:text-foreground font-medium pb-3">
              Top
            </TabsTrigger>
            <TabsTrigger value="accounts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground text-muted-foreground data-[state=active]:text-foreground font-medium pb-3">
              Accounts
            </TabsTrigger>
            <TabsTrigger value="hashtags" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground text-muted-foreground data-[state=active]:text-foreground font-medium pb-3">
              Hashtags
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Default Top Section when no query */}
        {!searchQuery && activeTab === "top" && (
          <>
            {/* Editor's Picks */}
            <div className="mb-6">
              <h3 className="text-foreground font-semibold mb-4">Editor's picks</h3>
              <div className="grid grid-cols-2 gap-4">
                {editorPicks.map((item) => (
                  <Card key={item.id} className="overflow-hidden cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {categories.map((category) => (
                <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center p-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                        <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{category.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Hashtags */}
            <div className="mb-6">
              {popularHashtags.map((hashtag, index) => (
                <Card key={index} className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">#</span>
                        <div>
                          <p className="font-medium">{hashtag.name}</p>
                          <p className="text-sm text-muted-foreground">{hashtag.views}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Tab-Specific Content */}
        <Tabs value={activeTab} className="w-full">
          {/* Top Tab */}
          <TabsContent value="top" className="mt-0">
            <div className="grid grid-cols-2 gap-4">
              {topContent.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white text-sm font-medium line-clamp-2">{item.title}</h3>
                      <p className="text-white/80 text-xs mt-1">@{item.user}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="mt-0">
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <img src={account.avatar} alt={account.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">@{account.username}</p>
                    <p className="text-xs text-muted-foreground">{account.followers} followers</p>
                  </div>
                  <Button variant="outline" size="sm">Follow</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Hashtags Tab */}
          <TabsContent value="hashtags" className="mt-0">
            <div className="space-y-3">
              {hashtags.map((hashtag) => (
                <div key={hashtag.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-foreground">{hashtag.tag}</h3>
                      {hashtag.trending && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{hashtag.posts}</p>
                  </div>
                  <Button variant="ghost" size="sm">Follow</Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
