// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowLeft, Camera, Save, X, Image } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth0 } from "@auth0/auth0-react";

// const EditProfile = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { user, getAccessTokenSilently } = useAuth0();

//   const [formData, setFormData] = useState({
//     name: "",
//     userId: "",
//     bio: "",
//     avatar: "/placeholder.svg",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   const galleryInputRef = useRef<HTMLInputElement>(null);
//   const cameraInputRef = useRef<HTMLInputElement>(null);

//   // Fetch user profile on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!user) return;
//       try {
//         const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
//         const res = await fetch(
//           `http://localhost:5000/api/users/${encodeURIComponent(user.sub)}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (!res.ok) throw new Error("Failed to fetch profile");
//         const data = await res.json();

//         setFormData({
//           name: data.name || "",
//           userId: data.userId || "",
//           bio: data.bio || "",
//           avatar: data.profilePicture || "/placeholder.svg",
//         });
//       } catch (err) {
//         console.error(err);
//         toast({
//           title: "Error",
//           description: "Failed to load profile",
//           variant: "destructive",
//         });
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchProfile();
//   }, [user, getAccessTokenSilently, toast]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData(prev => ({ ...prev, avatar: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/profile");
//   };

//   const handleSave = async () => {
//     setIsLoading(true);
//     try {
//       const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
//       const profileData = {
//         auth0Id: user.sub,
//         name: formData.name,
//         userId: formData.userId,
//         bio: formData.bio,
//         profilePicture: formData.avatar,
//       };

//       const response = await fetch(
//         `http://localhost:5000/api/users/${encodeURIComponent(user.sub)}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(profileData),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to update profile");

//       toast({
//         title: "Profile Updated",
//         description: "Your profile has been successfully updated!",
//       });

//       navigate("/profile", { state: { updatedProfile: profileData } });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message || "Failed to update profile",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-background p-4">
//       {/* Hidden Inputs */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={galleryInputRef}
//         className="hidden"
//         onChange={handleFileChange}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         capture="environment"
//         ref={cameraInputRef}
//         className="hidden"
//         onChange={handleFileChange}
//       />

//       <div className="flex items-center mb-6">
//         <Button variant="ghost" size="icon" onClick={handleCancel}>
//           <ArrowLeft className="h-5 w-5" />
//         </Button>
//         <h1 className="text-xl font-semibold ml-3">Edit Profile</h1>
//       </div>

//       {/* Profile Picture */}
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Profile Picture</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Avatar className="w-20 h-20 border-2 border-border cursor-pointer">
//                 <AvatarImage src={formData.avatar} />
//                 <AvatarFallback className="bg-primary text-primary-foreground text-2xl">🦊</AvatarFallback>
//               </Avatar>
//               <div className="absolute -bottom-1 -right-1 flex space-x-1">
//                 <Button
//                   size="icon"
//                   variant="secondary"
//                   className="w-8 h-8 rounded-full"
//                   onClick={() => cameraInputRef.current?.click()}
//                 >
//                   <Camera className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   size="icon"
//                   variant="secondary"
//                   className="w-8 h-8 rounded-full"
//                   onClick={() => galleryInputRef.current?.click()}
//                 >
//                   <Image className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Personal Information */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Personal Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid gap-2">
//             <Label htmlFor="name">Display Name *</Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={e => handleInputChange("name", e.target.value)}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="userId">User ID *</Label>
//             <Input
//               id="userId"
//               value={formData.userId}
//               onChange={e => handleInputChange("userId", e.target.value)}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="bio">Bio</Label>
//             <Textarea
//               id="bio"
//               value={formData.bio}
//               onChange={e => handleInputChange("bio", e.target.value)}
//               rows={4}
//             />
//           </div>

//           <div className="flex space-x-3 mt-4">
//             <Button onClick={handleSave} disabled={isLoading}>
//               <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save"}
//             </Button>
//             <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
//               <X className="h-4 w-4 mr-2" /> Cancel
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EditProfile;







import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, Save, X, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth0 } from "@auth0/auth0-react";

// ✅ Use environment variable for backend URL
const BASE_URL = import.meta.env.VITE_USER_SERVICE_URL;

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, getAccessTokenSilently } = useAuth0();

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    bio: "",
    avatar: "/placeholder.svg",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
        const res = await fetch(`${BASE_URL}/${encodeURIComponent(user.sub)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        setFormData({
          name: data.name || "",
          userId: data.userId || "",
          bio: data.bio || "",
          avatar: data.profilePicture || "/placeholder.svg",
        });
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [user, getAccessTokenSilently, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently({ audience: "https://myapp-api" });
      const profileData = {
        auth0Id: user.sub,
        name: formData.name,
        // userId: formData.userId,
        bio: formData.bio,
        profilePicture: formData.avatar,
      };

      const response = await fetch(`${BASE_URL}/${encodeURIComponent(user.sub)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      });

      navigate("/profile", { state: { updatedProfile: profileData } });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Hidden Inputs */}
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-3">Edit Profile</h1>
      </div>

      {/* Profile Picture */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-2 border-border cursor-pointer">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">🦊</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 flex space-x-1">
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-8 h-8 rounded-full"
                  onClick={() => cameraInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-8 h-8 rounded-full"
                  onClick={() => galleryInputRef.current?.click()}
                >
                  <Image className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
  <Label htmlFor="userId">Email</Label>
  <Input
    id="userId"
    value={user?.email || ""}
    disabled
    className="bg-gray-200 cursor-not-allowed"
  />
</div>


          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={e => handleInputChange("bio", e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex space-x-3 mt-4">
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
