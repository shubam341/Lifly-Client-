import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, MessageCircle, Share, MoreHorizontal, Send, Bookmark } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyPosts, Post, Comment } from "@/data/postData";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [menuOpen, setMenuOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const post: Post = dummyPosts.find((p) => p.id === Number(id)) || dummyPosts[0];

  const postImageRef = useRef<HTMLDivElement>(null);

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

  // Detect scroll to show sticky author bar
  useEffect(() => {
    const handleScroll = () => {
      if (!postImageRef.current) return;
      const rect = postImageRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0); // true if image is scrolled out
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center justify-between px-4 py-3 relative">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">Post</h1>

          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-md shadow-lg z-20">
                <Button variant="ghost" className="w-full justify-start px-4 py-2" onClick={handleRestrict}>Restrict</Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2" onClick={handleBlock}>Block</Button>
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
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold">{post.username}</span>
          </div>
          <Button
            variant={isFollowed ? "secondary" : "default"}
            size="sm"
            onClick={handleFollow}
          >
            {isFollowed ? "Following" : "Follow"}
          </Button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Post Content */}
        <div className="bg-card">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">{post.username}</h3>
                <p className="text-muted-foreground text-xs">2 hours ago</p>
              </div>
            </div>
            <Button
              variant={isFollowed ? "secondary" : "default"}
              size="sm"
              onClick={handleFollow}
              className="text-sm px-4"
            >
              {isFollowed ? "Following" : "Follow"}
            </Button>
          </div>

          <div ref={postImageRef} className="w-full">
            <img src={post.image} alt="Post content" className="w-full aspect-square object-cover" />
          </div>

          <div className="px-4 py-3">
            <div className="mb-2">
              <span className="font-semibold text-sm mr-2">{post.username}</span>
              <span className="text-sm">{post.description}</span>
            </div>
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:bg-transparent text-sm font-normal">
              View all {post.comments} comments
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-card mt-2">
          <div className="px-4 py-3 border-b border-border">
            <h4 className="font-semibold text-base">Comments ({post.comments})</h4>
          </div>
          <div className="px-4 py-2">
            {post.commentsList.map((c: Comment) => (
              <div key={c.id} className="flex space-x-3 py-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={c.avatar} />
                  <AvatarFallback>{c.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="bg-muted rounded-2xl px-3 py-2 mb-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm">{c.username}</span>
                    </div>
                    <p className="text-sm text-foreground">{c.comment}</p>
                  </div>
                  <div className="flex items-center space-x-4 px-3">
                    <span className="text-muted-foreground text-xs">{c.timestamp}</span>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:bg-transparent text-xs font-semibold" onClick={() => handleCommentLike(c.id)}>Like</Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:bg-transparent text-xs font-semibold">Reply</Button>
                    {likedComments.has(c.id) ? (
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                        <span className="text-xs text-muted-foreground">{c.likes + 1}</span>
                      </div>
                    ) : c.likes > 0 && (
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{c.likes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Input & Post Action Icons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-20">
        {/* Comment Input */}
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

        {/* Post Action Icons */}
        <div className="flex items-center justify-around px-4 py-2 border-t border-border mt-1">
          <Button variant="ghost" size="sm" onClick={handleSave} className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current text-foreground" : "text-muted-foreground"}`} />
            <span className="text-xs text-muted-foreground mt-1">2.4K</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLike} className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            <span className="text-xs text-muted-foreground mt-1">{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <MessageCircle className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground mt-1">{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center justify-center p-2 hover:bg-transparent">
            <Share className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground mt-1">{post.shares || 0}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
