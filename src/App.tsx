import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Menu from "./pages/Menu";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import LoginRequiredPage from "./pages/LoginRequiredPage";
import Scan from "./pages/Scan";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL; // Auth service URL
  const [tokenVerified, setTokenVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (isAuthenticated) {
        try {
          // Get Auth0 access token
      const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
console.log("Access token:", token);


          // Call backend /protected route
          const res = await fetch(`${API_URL}/protected`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            console.log("Backend verified token: true");
            setTokenVerified(true);
          } else {
            console.log("Backend verified token: false");
            setTokenVerified(false);
          }
        } catch (err) {
          console.log("Backend verified token: false", err);
          setTokenVerified(false);
        }
      } else {
        setTokenVerified(false);
      }
    };

    verifyToken();

    if (isAuthenticated) {
      setShowLoginAlert(true);
      const timer = setTimeout(() => setShowLoginAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, getAccessTokenSilently, API_URL]);

  // if (isLoading) return <div>Loading Auth0...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {tokenVerified !== null && (
          <div
            style={{
              position: "fixed",
              top: 10,
              left: 10,
              padding: "6px 12px",
              borderRadius: "6px",
              // backgroundColor: tokenVerified ? "#22c55e" : "#ef4444",
              color: "#fff",
              zIndex: 1000,
            }}
          >
            {/* Token Verified: {tokenVerified ? "✅ true" : "❌ false"} */}
          </div>
        )}

        <BrowserRouter>
          {showLoginAlert && (
            <div
              style={{
                position: "fixed",
                top: 50,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#22c55e",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "6px",
                zIndex: 1000,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              🎉 Congrats for successful login!
            </div>
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/menu" element={isAuthenticated ? <Menu /> : <LoginRequiredPage message="Login to access menu" />} />
            <Route path="/store" element={isAuthenticated ? <div>Store</div> : <LoginRequiredPage message="Login to go shopping" />} />
            <Route path="/messages" element={isAuthenticated ? <div>Messages</div> : <LoginRequiredPage message="Login to send messages" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <LoginRequiredPage message="Login to show yourself" />} />
            <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <LoginRequiredPage message="Login to edit your profile" />} />
            <Route path="/upload" element={isAuthenticated ? <Upload /> : <LoginRequiredPage message="Login to upload your post" />} />
            <Route path="/create-post" element={isAuthenticated ? <CreatePost /> : <LoginRequiredPage message="Login to create a post" />} />
            <Route path="/scan" element={isAuthenticated ? <Scan /> : <LoginRequiredPage message="Login to use scanner" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
