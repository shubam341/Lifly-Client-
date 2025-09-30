// import { useEffect, useState } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

// import Home from "./pages/Home";
// import Search from "./pages/Search";
// import Upload from "./pages/Upload";
// import CreatePost from "./pages/CreatePost";
// import Profile from "./pages/Profile";
// import EditProfile from "./pages/EditProfile";
// import Menu from "./pages/Menu";
// import PostDetail from "./pages/PostDetail";
// import NotFound from "./pages/NotFound";
// import LoginRequiredPage from "./pages/LoginRequiredPage";
// import Scan from "./pages/Scan";

// const queryClient = new QueryClient();

// // ✅ Protected route wrapper
// function ProtectedRoute({ children }: { children: JSX.Element }) {
//   const { isAuthenticated, isLoading } = useAuth0();
//   const location = useLocation();

//   if (isLoading) {
//     return <div>Loading...</div>; // show spinner or skeleton here
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login-required" state={{ from: location }} replace />;
//   }

//   return children;
// }

// const App = () => {
//   const { isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [showLoginAlert, setShowLoginAlert] = useState(false);

//   const API_URL = import.meta.env.VITE_BACKEND_URL;
//   const [tokenVerified, setTokenVerified] = useState<boolean | null>(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       if (isAuthenticated) {
//         try {
//           const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
//           console.log("Access token:", token);

//           const res = await fetch(`${API_URL}/protected`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           setTokenVerified(res.ok);
//         } catch (err) {
//           console.log("Backend verified token: false", err);
//           setTokenVerified(false);
//         }
//       } else {
//         setTokenVerified(false);
//       }
//     };

//     verifyToken();

//     if (isAuthenticated) {
//       setShowLoginAlert(true);
//       const timer = setTimeout(() => setShowLoginAlert(false), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isAuthenticated, getAccessTokenSilently, API_URL]);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />

//         <BrowserRouter>
//           {showLoginAlert && (
//             <div
//               style={{
//                 position: "fixed",
//                 top: 50,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 backgroundColor: "#22c55e",
//                 color: "#fff",
//                 padding: "8px 16px",
//                 borderRadius: "6px",
//                 zIndex: 1000,
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//               }}
//             >
//               🎉 Congrats for successful login!
//             </div>
//           )}

//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/search" element={<Search />} />
//             <Route path="/post/:id" element={<PostDetail />} />
//             <Route path="/login-required" element={<LoginRequiredPage message={""} />} />

//             {/* Protected routes */}
//             <Route
//               path="/menu"
//               element={
//                 <ProtectedRoute>
//                   <Menu />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/store"
//               element={
//                 <ProtectedRoute>
//                   <div>Store</div>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/messages"
//               element={
//                 <ProtectedRoute>
//                   <div>Messages</div>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/edit-profile"
//               element={
//                 <ProtectedRoute>
//                   <EditProfile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/upload"
//               element={
//                 <ProtectedRoute>
//                   <Upload />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/create-post"
//               element={
//                 <ProtectedRoute>
//                   <CreatePost />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/scan"
//               element={
//                 <ProtectedRoute>
//                   <Scan />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Not found */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;



import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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

// ✅ Protected route wrapper
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login-required" state={{ from: location }} replace />;

  return children;
}

const App = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [tokenVerified, setTokenVerified] = useState<boolean | null>(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005" ;

  useEffect(() => {
    const verifyToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
          console.log("Access token:", token);

          const res = await fetch(`${API_URL}/protected`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("Token verification failed");
          setTokenVerified(true);
          console.log("Backend verified token: true");
        } catch (err) {
          console.error("Backend verified token: false", err);
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

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
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login-required" element={<LoginRequiredPage message={""} />} />

            {/* Protected routes */}
            <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
            <Route path="/store" element={<ProtectedRoute><div>Store</div></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><div>Messages</div></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />

            {/* Not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;


