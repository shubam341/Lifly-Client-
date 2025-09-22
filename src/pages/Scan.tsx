import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, QrCode, Camera, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const [scanMode, setScanMode] = useState<"menu" | "scanner" | "camera">("menu");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Mock user data (replace with actual user data from your auth system)
  const mockUser = {
    id: "user_123456",
    name: "John Doe",
    email: "john@example.com"
  };

  // Generate QR code data for user's profile
  const generateProfileQR = () => {
    const profileData = {
      userId: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      profileUrl: window.location.origin + "/profile"
    };
    return JSON.stringify(profileData);
  };

  // Start camera for scanning
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  // Simulate scan detection (in real app, you'd use a QR code library)
  const simulateScan = () => {
    setScanResult("Profile scanned successfully!");
    setTimeout(() => {
      setScanResult("");
      setScanMode("menu");
    }, 2000);
  };

  useEffect(() => {
    if (scanMode === "camera") {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [scanMode]);

  const renderScanner = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScanMode("menu")}
            className="text-foreground hover:bg-accent"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold ml-4 text-foreground">My QR Code</h2>
        </div>

        <Card className="border-2 border-dashed border-primary/30">
          <CardContent className="p-8 text-center">
            <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <div className="w-40 h-40 bg-white rounded border-2 border-primary/20 flex items-center justify-center">
                <QrCode className="h-32 w-32 text-primary/60" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">{mockUser.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {mockUser.id}</p>
              <p className="text-xs text-muted-foreground break-all bg-muted p-2 rounded">
                {generateProfileQR()}
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground text-sm mt-4">
          Show this QR code to others to share your profile
        </p>
      </div>
    </div>
  );

  const renderCamera = () => (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setScanMode("menu")}
          className="text-foreground hover:bg-accent"
        >
         
        </Button>
        <h2 className="text-xl font-semibold ml-4 text-foreground">Scan QR Code</h2>
      </div>

      <div className="flex-1 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white rounded-lg relative">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary"></div>
          </div>
        </div>

        {/* Scanning indicator */}
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg mx-4">
            <p className="text-sm">Position QR code within the frame</p>
            {isScanning && (
              <div className="flex items-center justify-center mt-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span className="text-xs">Scanning...</span>
              </div>
            )}
          </div>
        </div>

        {/* Manual scan button for demo */}
        <Button
          onClick={simulateScan}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90"
        >
          Simulate Scan
        </Button>

        {scanResult && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <p className="text-foreground font-semibold">{scanResult}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="text-foreground hover:bg-accent"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold ml-4 text-foreground">QR Scanner</h2>
        </div>

        <div className="space-y-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setScanMode("scanner")}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">My QR Code</h3>
                  <p className="text-sm text-muted-foreground">Show your profile QR code</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setScanMode("camera")}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Scan QR Code</h3>
                  <p className="text-sm text-muted-foreground">Scan someone else's QR code</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Use QR codes to quickly share and connect with other profiles
          </p>
        </div>
      </div>
    </div>
  );

  switch (scanMode) {
    case "scanner":
      return renderScanner();
    case "camera":
      return renderCamera();
    default:
      return renderMenu();
  }
};

export default Scan;