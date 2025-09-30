import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth0 } from "@auth0/auth0-react";

interface LocationState {
  selectedFile?: File;
  fileType?: "image" | "video" | "text";
}

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 🔹 Generate preview for selected file
  useEffect(() => {
    if (state?.selectedFile) {
      const url = URL.createObjectURL(state.selectedFile);
      setMediaPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [state?.selectedFile]);

  // 🔹 Upload post to backend
  const handleUpload = async () => {
    if (!title.trim() || !category || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!state?.selectedFile && state.fileType !== "text") {
      toast({ title: "No file selected", variant: "destructive" });
      return;
    }

    setIsUploading(true);

    try {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("bio", description);

      if (state?.selectedFile) formData.append("media", state.selectedFile);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      toast({
        title: "Post Created Successfully!",
        description: "Your post is now live.",
        className: "bg-green-600 text-white",
      });

      navigate("/"); // Go back to Home after upload
    } catch (err) {
      toast({
        title: "Upload Failed",
        description: "Error uploading post. Try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  // 🔹 If no file selected, show fallback screen
  if (!state?.selectedFile && state.fileType !== "text") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-4">No file selected</h2>
          <Button onClick={() => navigate("/upload")} variant="secondary">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Header */}
      <div className="absolute top-12 right-4 left-4 z-20 flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Upload Post</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          X
        </Button>
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm py-10 z-20">
        <div className="px-4 space-y-6">
          {state.fileType !== "text" && (
            <div className="flex justify-center mb-6">
              <div className="relative w-28 h-28 bg-gray-800 rounded-lg overflow-hidden">
                {state.fileType === "video" ? (
                  <video src={mediaPreview || ""} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={mediaPreview || ""} alt="Selected media" className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          )}

          <Input
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
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
          />

          <Button
            onClick={handleUpload}
            disabled={isUploading || !title || !category || !description}
            className="bg-red-600 px-8 py-3 rounded-full text-white font-medium hover:bg-red-500 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
