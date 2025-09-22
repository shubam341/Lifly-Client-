// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import BottomNavigation from "@/components/BottomNavigation"; // ✅ import

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle signup logic here
//     console.log("Signup data:", formData);
//   };

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       {/* Content */}
//       <div className="flex-1 flex items-center justify-center p-4">
//         <Card className="w-full max-w-md p-6 space-y-6">
//           <div className="text-center space-y-2">
//             <h2 className="text-2xl font-bold">Create Account</h2>
//             <p className="text-muted-foreground">Join us today and get started</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Create a password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             <Button type="submit" className="w-full">
//               Create Account
//             </Button>
//           </form>

//           {/* ✅ Inline login option */}
//           <div className="flex items-center justify-center gap-2 text-sm">
//             <p className="text-muted-foreground">Already have an account?</p>
//            <Button 
//   variant="ghost" 
//   onClick={() => navigate("/login", { replace: true })}  // ✅ replace history
//   className="text-primary hover:text-primary/80 px-1"
// >
//   Login
// </Button>

//           </div>
//         </Card>
//       </div>

//       {/* ✅ Bottom Navigation */}
//       <BottomNavigation />
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup data:", formData);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {/* <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Sign Up</h1>
        <div className="w-10" />
      </div> */}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 max-w-md mx-auto w-full">
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground text-lg">Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="h-12 text-base"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-medium mt-8">
            Create Account
          </Button>
        </form>

        {/* Login option */}
        <div className="flex items-center justify-center gap-2 text-base mt-6 mb-8">
          <p className="text-muted-foreground">Already have an account?</p>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/login")}
            className="text-primary hover:text-primary/80 px-2 font-medium"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;