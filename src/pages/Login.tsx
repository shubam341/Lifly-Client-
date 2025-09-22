import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation"; // ✅ import

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    // Handle login logic here
    console.log("Login data:", formData);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password clicked");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={handleForgotPassword}
              className="text-muted-foreground hover:text-primary text-sm"
            >
              Forgot Password?
            </Button>
          </div>

          {/* ✅ Inline signup option */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <p className="text-muted-foreground">Don't have an account?</p>
         <Button 
  variant="ghost" 
  onClick={() => navigate("/signup", { replace: true })} 
  className="text-primary hover:text-primary/80 px-1"
>
  Sign Up
</Button>

          </div>
        </Card>
      </div>

      {/* ✅ Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Login;
