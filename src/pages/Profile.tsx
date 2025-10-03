import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Menu,
  Share,
  Settings,
  Palette,
  Scan,
  ShoppingBag,
  FileText,
  ShoppingCart,
  Search,
  ArrowLeft,
  Shield,
  Bell,
  Lock,
  Trash2,
  Smartphone,
  UserPlus,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [bgVariant, setBgVariant] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, getAccessTokenSilently } = useAuth0();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    userId: user?.sub || "",
    bio: "",
    avatar: user?.picture || "/placeholder.svg",
  });

  const [userPosts, setUserPosts] = useState<any[]>([]);

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
      const userId = encodeURIComponent(user.sub);
      const API_URL = import.meta.env.VITE_USER_SERVICE_URL;

      
      const res = await fetch(`${API_URL}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch profile: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      setProfile({
  name: data.name || user.name || "",
  userId: data.userId || user.sub,
  bio: data.bio || "",
  avatar: getMediaUrl(data.profilePicture) || user.picture || "/placeholder.svg",
});

    } catch (err: any) {
      console.error("Error fetching profile:", err.message);
    }
  };

  const fetchUserPosts = async () => {
  if (!user) return;
  try {
    const API_URL = import.meta.env.VITE_POST_SERVICE_URL;
    const res = await fetch(`${API_URL}?authorId=${encodeURIComponent(user.sub)}`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data = await res.json();

    // Map posts to include proper media URL
    const mappedPosts = data.map((post: any) => ({
      ...post,
      mediaUrl: getMediaUrl(post.mediaUrl), // <-- fix here
    }));

    setUserPosts(mappedPosts);
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
};

const getMediaUrl = (mediaPath: string | undefined) => {
  if (!mediaPath) return "/placeholder.svg";
  return mediaPath.startsWith("http")
    ? mediaPath.replace("http://localhost:5005", import.meta.env.VITE_BACKEND_URL)
    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${mediaPath}`;
};


  useEffect(() => {
    const updatedProfile = (location.state as any)?.updatedProfile;
    if (updatedProfile) {
      setProfile({
        name: updatedProfile.name || user?.name || "",
        userId: updatedProfile.userId || user?.sub || "",
        bio: updatedProfile.bio || "",
        avatar: updatedProfile.profilePicture || user?.picture || "/placeholder.svg",
      });
    } else {
      fetchProfile();
    }
    fetchUserPosts();
  }, [user, getAccessTokenSilently, location.state]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profileStats = { following: 5, followers: 120, likes: 50 };

  const settingsItems = [
    { icon: Shield, label: "Account Security", hasArrow: true },
    { icon: Settings, label: "General Settings", hasArrow: true },
    { icon: Bell, label: "Notification Settings", hasArrow: true },
    { icon: Lock, label: "Privacy Settings", hasArrow: true },
    { icon: Trash2, label: "Clear Cache", value: "596.1 MB", hasArrow: true },
    { icon: FileText, label: "Content preferences", hasArrow: true },
    { icon: UserPlus, label: "Add Widget", hasArrow: true },
    { icon: Smartphone, label: "Teen Mode", value: "Not Enabled", hasArrow: true },
  ];

  const backgrounds = [
    "bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600",
    "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600",
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Profile",
        text: "Check out my profile!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  const filteredPosts = userPosts.filter((post) =>
    post.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`flex flex-col min-h-screen ${backgrounds[bgVariant]}`}>
      {showSettings ? (
        <div className="fixed inset-0 bg-background z-50">
          <div className="p-4">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
                className="text-foreground hover:bg-accent"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h2 className="text-xl font-semibold ml-4 text-foreground">Settings</h2>
            </div>
            <div className="space-y-1">
              {settingsItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-accent rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.value && <span className="text-muted-foreground text-sm">{item.value}</span>}
                    {item.hasArrow && <span className="text-muted-foreground">›</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setShowSettings(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-2 py-1 text-xs"
                onClick={() => setBgVariant((bgVariant + 1) % backgrounds.length)}
              >
                <Palette className="h-3 w-3 mr-1" />
                Change background
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-2 py-1 text-xs"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                Logout
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => navigate("/scan")}
              >
                <Scan className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="text-white hover:bg-white/10"
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Profile Info + Content */}
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="px-4 pb-6">
              {/* Profile Info */}
              <div className="flex items-start space-x-4 mb-2">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-2 border-white/20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="bg-orange-500 text-white text-2xl">
                      {profile.name ? profile.name[0] : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">+</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl text-white font-bold mb-1">{profile.name || "Your Name"}</h2>
                  <p className="text-white/70 text-sm mb-1">ID: {user?.email}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/60 text-sm mb-4">{profile.bio || "You have no bio yet"}</p>

              {/* Stats and Edit */}
              <div className="flex items-center text-white justify-between mb-6">
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="text-xl font-bold">{profileStats.following}</div>
                    <div className="text-white/70 text-xs">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{profileStats.followers}</div>
                    <div className="text-white/70 text-xs">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{profileStats.likes}</div>
                    <div className="text-white/70 text-xs">Likes</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-3 py-1 text-sm"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </Button>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-3 gap-3 mb-1 mt-9">
                {[
                  { icon: ShoppingBag, title: "Shop", desc: "Fun items" },
                  { icon: FileText, title: "Orders", desc: "My orders" },
                  { icon: ShoppingCart, title: "Cart", desc: "View items" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-1 text-center hover:scale-105 transition-transform"
                  >
                    <item.icon className="h-6 w-6 mx-auto mb-1 text-white/80" />
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-white/60 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-t-3xl min-h-[400px]">
              <div className="p-4">
                <Tabs defaultValue="posts" className="w-full">
                  <div className="flex items-center justify-between mb-4" ref={searchRef}>
                    <TabsList className="bg-transparent p-0 h-auto">
                      {["posts", "collects", "likes"].map((tab) => (
                        <TabsTrigger
                          key={tab}
                          value={tab}
                          className="text-sm font-medium text-gray-500 data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none pb-1 ml-4 first:ml-0"
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:bg-gray-100"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>

                  {["posts", "collects", "likes"].map((tab) => (
                    <TabsContent key={tab} value={tab} className="mt-4">
                      <div className="grid grid-cols-2 gap-3">
                        {filteredPosts
                          .filter((p) => {
                            if (tab === "posts") return true;
                            if (tab === "collects") return p.type === "collect";
                            if (tab === "likes") return p.type === "like";
                            return false;
                          })
                          .map((p) => (
                            <div
                              key={p._id}
                              className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => navigate(`/post/${p._id}`, { state: { post: p } })}
                            >
                              <img
                             src={p.mediaUrl || "/placeholder.svg"}
                                alt={p.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="p-2 text-xs text-gray-600">
                                {new Date(p.createdAt).toLocaleString()}
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Profile;
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Menu,
//   Share,
//   Settings,
//   Palette,
//   Scan,
//   FileText,
//   ShoppingCart,
//   Search,
//   ArrowLeft,
//   Shield,
//   Bell,
//   Lock,
//   Trash2,
//   Smartphone,
//   UserPlus,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import BottomNavigation from "@/components/BottomNavigation";
// import { useAuth0 } from "@auth0/auth0-react";
// import PostGrid from "@/components/PostGrid"; // import PostGrid

// const Profile = () => {
//   const [showSettings, setShowSettings] = useState(false);
//   const [bgVariant, setBgVariant] = useState(0);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const searchRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout, getAccessTokenSilently } = useAuth0();

//   const [profile, setProfile] = useState({
//     name: user?.name || "",
//     userId: user?.sub || "",
//     bio: "",
//     avatar: user?.picture || "/placeholder.svg",
//   });

//   const [userPosts, setUserPosts] = useState<any[]>([]);

//   const fetchProfile = async () => {
//     if (!user) return;
//     try {
//       const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
//       const userId = encodeURIComponent(user.sub);
//       const API_URL = import.meta.env.VITE_USER_SERVICE_URL;

//       const res = await fetch(`${API_URL}/${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`Failed to fetch profile: ${res.status} - ${errorText}`);
//       }

//       const data = await res.json();
//       setProfile({
//         name: data.name || user.name || "",
//         userId: data.userId || user.sub,
//         bio: data.bio || "",
//         avatar: data.profilePicture || user.picture || "/placeholder.svg",
//       });
//     } catch (err: any) {
//       console.error("Error fetching profile:", err.message);
//     }
//   };

//   const fetchUserPosts = async () => {
//     if (!user) return;
//     try {
//       const API_URL = import.meta.env.VITE_POST_SERVICE_URL;
//       const res = await fetch(`${API_URL}/api/posts?authorId=${encodeURIComponent(user.sub)}`);
//       if (!res.ok) throw new Error("Failed to fetch posts");
//       const data = await res.json();
//       setUserPosts(data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     }
//   };

//   useEffect(() => {
//     const updatedProfile = (location.state as any)?.updatedProfile;
//     if (updatedProfile) {
//       setProfile({
//         name: updatedProfile.name || user?.name || "",
//         userId: updatedProfile.userId || user?.sub || "",
//         bio: updatedProfile.bio || "",
//         avatar: updatedProfile.profilePicture || user?.picture || "/placeholder.svg",
//       });
//     } else {
//       fetchProfile();
//     }
//     fetchUserPosts();
//   }, [user, getAccessTokenSilently, location.state]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setSearchOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const profileStats = { following: 5, followers: 120, likes: 50 };

//   const settingsItems = [
//     { icon: Shield, label: "Account Security", hasArrow: true },
//     { icon: Settings, label: "General Settings", hasArrow: true },
//     { icon: Bell, label: "Notification Settings", hasArrow: true },
//     { icon: Lock, label: "Privacy Settings", hasArrow: true },
//     { icon: Trash2, label: "Clear Cache", value: "596.1 MB", hasArrow: true },
//     { icon: FileText, label: "Content preferences", hasArrow: true },
//     { icon: UserPlus, label: "Add Widget", hasArrow: true },
//     { icon: Smartphone, label: "Teen Mode", value: "Not Enabled", hasArrow: true },
//   ];

//   const backgrounds = [
//     "bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600",
//     "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600",
//   ];

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: "My Profile",
//         text: "Check out my profile!",
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert("Profile link copied to clipboard!");
//     }
//   };

//   const filteredPosts = userPosts.filter((post) =>
//     post.title?.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className={`flex flex-col min-h-screen ${backgrounds[bgVariant]}`}>
//       {showSettings ? (
//         <div className="fixed inset-0 bg-background z-50">
//           {/* Settings panel */}
//           <div className="p-4">
//             <div className="flex items-center mb-6">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setShowSettings(false)}
//                 className="text-foreground hover:bg-accent"
//               >
//                 <ArrowLeft className="h-6 w-6" />
//               </Button>
//               <h2 className="text-xl font-semibold ml-4 text-foreground">Settings</h2>
//             </div>
//             <div className="space-y-1">
//               {settingsItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-4 hover:bg-accent rounded-lg cursor-pointer transition-colors"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <item.icon className="h-5 w-5 text-muted-foreground" />
//                     <span className="text-foreground">{item.label}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {item.value && <span className="text-muted-foreground text-sm">{item.value}</span>}
//                     {item.hasArrow && <span className="text-muted-foreground">›</span>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Header */}
//           <div className="flex items-center justify-between p-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-white hover:bg-white/10"
//               onClick={() => setShowSettings(true)}
//             >
//               <Menu className="h-6 w-6" />
//             </Button>

//             <div className="flex items-center space-x-3">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-2 py-1 text-xs"
//                 onClick={() => setBgVariant((bgVariant + 1) % backgrounds.length)}
//               >
//                 <Palette className="h-3 w-3 mr-1" />
//                 Change background
//               </Button>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-2 py-1 text-xs"
//                 onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
//               >
//                 Logout
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-white hover:bg-white/10"
//                 onClick={() => navigate("/scan")}
//               >
//                 <Scan className="h-5 w-5" />
//               </Button>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={handleShare}
//                 className="text-white hover:bg-white/10"
//               >
//                 <Share className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>

//           {/* Profile Info */}
//           <div className="flex-1 overflow-y-auto pb-20">
//             <div className="px-4 pb-6">
//               <div className="flex items-start space-x-4 mb-2">
//                 <Avatar className="w-20 h-20 border-2 border-white/20">
//                   <AvatarImage src={profile.avatar} />
//                   <AvatarFallback className="bg-orange-500 text-white text-2xl">
//                     {profile.name ? profile.name[0] : "U"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <h2 className="text-2xl text-white font-bold mb-1">{profile.name || "Your Name"}</h2>
//                   <p className="text-white/70 text-sm mb-1">ID: {user?.email}</p>
//                   <p className="text-white/60 text-sm">{profile.bio || "You have no bio yet"}</p>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="flex items-center text-white justify-between mb-6">
//                 <div className="flex space-x-6">
//                   <div className="text-center">
//                     <div className="text-xl font-bold">{profileStats.following}</div>
//                     <div className="text-white/70 text-xs">Following</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-xl font-bold">{profileStats.followers}</div>
//                     <div className="text-white/70 text-xs">Followers</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-xl font-bold">{profileStats.likes}</div>
//                     <div className="text-white/70 text-xs">Likes</div>
//                   </div>
//                 </div>

//                 <Button
//                   variant="outline"
//                   className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-3 py-1 text-sm"
//                   onClick={() => navigate("/edit-profile")}
//                 >
//                   Edit Profile
//                 </Button>
//               </div>

//               {/* Action Cards */}
//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 {[
//                   { icon: FileText, title: "Orders", desc: "My orders" },
//                   { icon: ShoppingCart, title: "Cart", desc: "View items" },
//                 ].map((item, i) => (
//                   <div
//                     key={i}
//                     className="bg-white/10 backdrop-blur-sm rounded-xl p-1 text-center hover:scale-105 transition-transform"
//                   >
//                     <item.icon className="h-6 w-6 mx-auto mb-1 text-white/80" />
//                     <h3 className="font-semibold text-sm">{item.title}</h3>
//                     <p className="text-white/60 text-xs">{item.desc}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* User Posts */}
//               <PostGrid posts={filteredPosts} currentUserName={profile.name} />
//             </div>
//           </div>
//         </>
//       )}
//       <BottomNavigation />
//     </div>
//   );
// };

// export default Profile;
