import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Type, X, Image, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();

  const openFilePicker = (accept: string, type: "image" | "video") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = false;
    input.onchange = () => {
      if (input.files && input.files[0]) {
        const selectedFile = input.files[0];
        navigate("/create-post", {
          state: {
            selectedFile,
            fileType: type,
          },
        });
      }
    };
    input.click();
  };

  const handlePhoto = () => openFilePicker("image/*", "image");
  const handleVideo = () => openFilePicker("video/*", "video");

  const handleCamera = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.capture = "environment";
    input.onchange = () => {
      if (input.files && input.files[0]) {
        const selectedFile = input.files[0];
        const isVideo = selectedFile.type.startsWith("video/");
        navigate("/create-post", {
          state: {
            selectedFile,
            fileType: isVideo ? "video" : "image",
          },
        });
      }
    };
    input.click();
  };

  const handleText = () => {
    navigate("/create-post", {
      state: {
        fileType: "text",
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Header */}
      <div className="absolute top-12 right-4 left-4 z-20 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20"
        >
         
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Options */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm py-10 z-20">
        <div className="flex flex-col items-center space-y-6">
          {/* Album with two options */}
          <div className="flex flex-row items-center space-x-6">
            <div className="flex flex-col items-center">
              <button
                onClick={handlePhoto}
                className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-700 transition-colors"
              >
                <Image className="w-8 h-8 text-white" />
              </button>
              <span className="text-white text-sm">Upload Photo</span>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleVideo}
                className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-700 transition-colors"
              >
                <Video className="w-8 h-8 text-white" />
              </button>
              <span className="text-white text-sm">Upload Video</span>
            </div>
          </div>

          {/* Camera */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleCamera}
              className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-700 transition-colors"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
            <span className="text-white text-sm">Camera</span>
            <span className="text-xs text-gray-400 mt-1">Capture Photo/Video</span>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleText}
              className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-700 transition-colors"
            >
              <Type className="w-8 h-8 text-white" />
            </button>
            <span className="text-white text-sm">Text</span>
          </div>

          {/* Cancel Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-red-600 px-8 py-3 rounded-full text-white font-medium hover:bg-red-500 mt-4 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
