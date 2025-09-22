import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { LogIn, Check } from "lucide-react";
import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";

// Props: message to show if user is not logged in
interface LoginRequiredPageProps {
  message: string;
  Component?: React.ComponentType; // optional: actual page component
}

const LoginRequiredPage = ({ message, Component }: LoginRequiredPageProps) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // ✅ If logged in, render the actual component
  if (isAuthenticated && Component) {
    return <Component />;
  }

  // Otherwise, show login required UI
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white px-6">
      {/* Header */}
      <div className="flex justify-end pt-6">
        <button className="text-gray-400 text-sm">Help</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl font-bold text-red-500 tracking-wider">LIFELY</h1>
        <p className="text-lg text-gray-200 text-center">{message}</p>

        {/* Login Button */}
        <div className="w-full max-w-sm space-y-4">
          <Button
            disabled={!agreedToTerms}
            className={`w-full rounded-full py-4 text-lg font-medium flex items-center justify-center gap-2 ${
              agreedToTerms
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
            onClick={() =>
              loginWithRedirect({
                appState: { returnTo: window.location.pathname },
              })
            }
          >
            <LogIn className="w-5 h-5" /> Log In
          </Button>

          <p className="text-gray-400 text-sm text-center">
            Welcome to Lifely – your lifestyle hub
          </p>
        </div>
      </div>

      {/* Footer Terms */}
      <div className="pb-20 space-y-4">
        <div className="flex items-start gap-3">
          <button onClick={() => setAgreedToTerms(!agreedToTerms)} className="mt-1">
            <div
              className={`w-4 h-4 rounded-sm border border-gray-500 flex items-center justify-center ${
                agreedToTerms ? "bg-red-500 border-red-500" : "bg-transparent"
              }`}
            >
              {agreedToTerms && <Check className="w-3 h-3 text-white" />}
            </div>
          </button>
          <p className="text-xs text-gray-400 leading-relaxed">
            I have read and agreed to Terms, Privacy Policy, Rules Regarding Protection of Personal Information
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default LoginRequiredPage;
