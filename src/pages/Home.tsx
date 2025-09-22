import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Radio, Search } from "lucide-react"; 
import PostGrid from "@/components/PostGrid";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { dummyPosts, Post } from "@/data/postData";
import FollowingPage from "./Followingpage"; 
import { useAuth0 } from "@auth0/auth0-react";   // ✅ Auth0

const Home = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const [activeCategory, setActiveCategory] = useState("All"); 
  const navigate = useNavigate();

  // ✅ Auth0 hooks
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const tabs = ["Following", "Explore", "Nearby"];
  const categories = [
    "All", "Fashion", "Personal care", "Food", "Home", "Health", "Travel"
  ];

  // Filter posts based on tab and category
  const filteredPosts: Post[] = dummyPosts.filter((post) => {
    if (activeCategory === "All") {
      if (activeTab === "Following") return post.isFollowed;
      if (activeTab === "Explore") return true;
      if (activeTab === "Nearby") return post.tabs.includes("Nearby");
    }

    if (activeTab === "Following") {
      return post.isFollowed && post.category === activeCategory;
    } else if (activeTab === "Explore") {
      return post.category === activeCategory;
    } else if (activeTab === "Nearby") {
      return post.tabs.includes("Nearby") && post.category === activeCategory;
    }

    return false;
  });

  // ✅ Backend test function (only works if user is logged in)
  const testBackend = async () => {
    if (!isAuthenticated) {
      // redirect to login if user is not logged in
      loginWithRedirect();
      
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:4000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("✅ Backend response:", data);
    } catch (err) {
      console.error("❌ Backend error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/live")}>
            <Radio className="h-6 w-6 font-bold text-black" />
          </Button>

          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={() => navigate("/search")}>
            <Search className="h-6 w-6" />
          </Button>
        </div>

        {/* Categories */}
        <div className="px-4 pb-2">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <span
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer whitespace-nowrap text-xs ${
                  activeCategory === category
                    ? "text-primary font-semibold border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {activeTab === "Following" ? (
          <FollowingPage
            posts={dummyPosts.filter((post) =>
              post.isFollowed &&
              (activeCategory === "All" || post.category === activeCategory)
            )}
          />
        ) : (
          <PostGrid posts={filteredPosts} />
        )}
      </div>

      {/* ✅ Backend test button */}
      <div className="mt-8 flex justify-center">
        <Button onClick={testBackend}>
          {isAuthenticated ? "Test Backend" : "Login to Test Backend"}
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;
