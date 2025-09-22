import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Image as ImageIcon, Video, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface LocationState {
  selectedFile?: File;
  fileType?: "image" | "video";
}

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Generate preview URL for selected file
  useEffect(() => {
    if (state?.selectedFile) {
      const url = URL.createObjectURL(state.selectedFile);
      setMediaPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [state?.selectedFile]);

  const handleUpload = async () => {
    if (!title.trim() || !category || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Post Created Successfully!",
        description: "Your post has been uploaded and is now live.",
        className: "bg-green-600 text-white",
      });
      navigate("/");
    } catch {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!state?.selectedFile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-4">No file selected</h2>
          <Button onClick={() => navigate("/upload")} variant="secondary">
            Go Back to Upload
          </Button>
        </div>
      </div>
    );
  }

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
        <h1 className="text-white text-xl font-semibold">Upload Post</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Content Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm py-10 z-20">
        <div className="px-4 space-y-6">
          {/* Media Preview */}
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28 bg-gray-800 rounded-lg overflow-hidden">
              {mediaPreview ? (
                state.fileType === "video" ? (
                  <video src={mediaPreview} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={mediaPreview} alt="Selected media" className="w-full h-full object-cover" />
                )
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  {state.fileType === "video" ? (
                    <Video className="h-8 w-8 text-gray-400" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Post Form */}
          <div className="space-y-4">
            <Input
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              maxLength={100}
            />

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="art">Art & Creative</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="What's the story behind this post?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-h-[80px] resize-none"
              maxLength={500}
            />
          </div>

          {/* Upload / Cancel Buttons */}
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={handleUpload}
              disabled={isUploading || !title.trim() || !category || !description.trim()}
              className="bg-red-600 px-8 py-3 rounded-full text-white font-medium hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Post</span>
                </div>
              )}
            </Button>

            <Button
              onClick={() => navigate(-1)}
              className="bg-gray-700 px-8 py-3 rounded-full text-white font-medium hover:bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

