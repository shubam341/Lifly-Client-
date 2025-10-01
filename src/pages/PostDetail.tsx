import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, MessageCircle, Share, MoreHorizontal, Send, Bookmark } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface Comment {
  id: number;
  username: string;
  avatar: string;
  comment: string;
  likes: number;
  timestamp: string;
}

interface Post {
  _id: string;
  title: string;
  category: string;
  bio: string;
  mediaUrl: string;
  authorName: string;
  authorAvatar: string;
  likes?: number;
  comments?: number;
  commentsList?: Comment[];
  isFollowed?: boolean;
  isSaved?: boolean;
}

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [menuOpen, setMenuOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const postImageRef = useRef<HTMLDivElement>(null);
  const API_URL = import.meta.env.VITE_POST_SERVICE_URL || "http://localhost:5005";

  // 🔹 Normalize media URLs
  const getMediaUrl = (mediaPath: string | undefined) => {
    if (!mediaPath) return "/placeholder.svg";

    // Replace localhost or insecure HTTP with backend URL
    if (mediaPath.startsWith("http")) {
      return mediaPath.replace("https://lifly-ecommerce-server.onrender.com", import.meta.env.VITE_BACKEND_URL);
    }

    // Relative path from backend
    return `${import.meta.env.VITE_BACKEND_URL}/uploads/${mediaPath}`;
  };

  // 🔹 Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();

        setPost({
          ...data,
          mediaUrl: getMediaUrl(data.mediaUrl),
          authorAvatar: getMediaUrl(data.authorAvatar),
          likes: data.likesCount || 0,
          comments: data.commentsCount || 0,
          isFollowed: data.isFollowed || false,
          isSaved: data.isSaved || false,
        });
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  // 🔹 Scroll sticky author bar
  useEffect(() => {
    const handleScroll = () => {
      if (!postImageRef.current) return;
      const rect = postImageRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // 🔹 Event handlers
  const handleLike = () => setIsLiked(!isLiked);
  const handleFollow = () => setIsFollowed(!isFollowed);
  const handleSave = () => setIsSaved(!isSaved);
  const handleCommentLike = (commentId: number) => {
    const newLikedComments = new Set(likedComments);
    newLikedComments.has(commentId) ? newLikedComments.delete(commentId) : newLikedComments.add(commentId);
    setLikedComments(newLikedComments);
  };
  const handleSendComment = () => {
    if (comment.trim()) {
      console.log("Sending comment:", comment);
      setComment("");
    }
  };
  const handleRestrict = () => alert("User Restricted!");
  const handleBlock = () => alert("User Blocked!");

  // 🔹 Share post
  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: postUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(postUrl);
        console.log("Post link copied to clipboard!");
      } catch {
        console.error("Failed to copy link");
      }
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center justify-between px-4 py-3 relative">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            {/* <ArrowLeft className="h-6 w-6" /> */}
          </Button>
          <h1 className="text-lg font-semibold">{post.title || "Post"}</h1>

          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-md shadow-lg z-20">
                <Button variant="ghost" className="w-full justify-start px-4 py-2" onClick={handleRestrict}>
                  Restrict
                </Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2" onClick={handleBlock}>
                  Block
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Author Bar */}
      {showStickyBar && (
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-20 flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.authorAvatar} />
              <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{post.authorName}</span>
          </div>
          <Button variant={isFollowed ? "secondary" : "default"} size="sm" onClick={handleFollow}>
            {isFollowed ? "Following" : "Follow"}
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="bg-card">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.authorAvatar} />
                <AvatarFallback>{post.authorName[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">{post.authorName}</h3>
                {/* Actual timestamp */}
                <p className="text-muted-foreground text-xs">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <Button variant={isFollowed ? "secondary" : "default"} size="sm" onClick={handleFollow}>
              {isFollowed ? "Following" : "Follow"}
            </Button>
          </div>

          <div ref={postImageRef} className="w-full">
            <img src={post.mediaUrl} alt="Post content" className="w-full aspect-square object-cover" />
          </div>

          <div className="px-4 py-3">
            {/* Title */}
            <h1 className="text-lg font-bold">{post.title}</h1>
            {/* Actual bio */}
            {post.bio && <p className="text-sm text-gray-600 mt-1">{post.bio}</p>}

            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:bg-transparent text-sm font-normal mt-2">
              View all {post.comments || 0} comments
            </Button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-20">
        <div className="flex items-center space-x-3 px-4 py-2">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center space-x-2">
            <Input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 rounded-full border border-muted-foreground/20 px-4 py-2 text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
            />
            <Button size="icon" onClick={handleSendComment} disabled={!comment.trim()} className="rounded-full w-8 h-8 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-around px-4 py-2 border-t border-border mt-1">
          <Button variant="ghost" size="sm" onClick={handleSave} className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current text-foreground" : "text-muted-foreground"}`} />
            <span className="text-xs text-muted-foreground mt-1">{post.likes || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLike} className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            <span className="text-xs text-muted-foreground mt-1">{post.likes || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <MessageCircle className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground mt-1">{post.comments || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare} className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <Share className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground mt-1">{post.shares || 0}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
