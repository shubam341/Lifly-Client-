import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Radio, Search } from "lucide-react"; 
import PostGrid from "@/components/PostGrid";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import FollowingPage from "./Followingpage"; 
import { useAuth0 } from "@auth0/auth0-react";

// 🔹 Post type for frontend
interface Post {
  id: string;
  image: string;
  username: string;
  avatar?: string;
  description?: string;
  likes?: number;
  comments?: number;
  isFollowed?: boolean;
  tabs?: string[];
  category?: string;
}


const Home = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const [activeCategory, setActiveCategory] = useState("All"); 
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const tabs = ["Following", "Explore", "Nearby"];
  const categories = ["All", "Fashion", "Personal care", "Food", "Home", "Health", "Travel"];

  // 🔹 Helper to generate full media URL
const getMediaUrl = (mediaPath: string | undefined) => {
  if (!mediaPath) return "";
  if (mediaPath.startsWith("http")) return mediaPath;
  return `${import.meta.env.VITE_BACKEND_URL}/uploads/${mediaPath}`;
};


  // 🔹 Fetch posts and map to frontend format
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
        const data = await res.json();

    const mappedPosts: Post[] = data.map((p: any) => ({
  id: p._id,
  title: p.title,
  image: getMediaUrl(p.mediaUrl),
  username: p.authorName,
  avatar: p.authorAvatar ? getMediaUrl(p.authorAvatar) : "",// blank if not uploaded
  description: p.bio || "",
  category: p.category,
  likes: p.likesCount || 0,
  comments: p.commentsCount || 0,
  createdAt: p.createdAt,
  isFollowed: p.isFollowed || false,
  tabs: p.tabs || [],
  commentsList: p.commentsList || [],
}));


        setPosts(mappedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  // 🔹 Filter posts by tab and category
  const filteredPosts: Post[] = posts.filter((post) => {
    if (activeCategory === "All") {
      if (activeTab === "Following") return post.isFollowed;
      if (activeTab === "Explore") return true;
      if (activeTab === "Nearby") return post.tabs?.includes("Nearby");
    }

    if (activeTab === "Following") {
      return post.isFollowed && post.category === activeCategory;
    } else if (activeTab === "Explore") {
      return post.category === activeCategory;
    } else if (activeTab === "Nearby") {
      return post.tabs?.includes("Nearby") && post.category === activeCategory;
    }

    return false;
  });

  // 🔹 Backend test function
  const testBackend = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
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
            posts={filteredPosts.filter((post) => post.isFollowed)}
          />
        ) : (
          <PostGrid posts={filteredPosts} />
        )}
      </div>

      {/* Backend test button */}
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
