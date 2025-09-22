import { Heart, MessageCircle, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Post } from "@/data/postData";

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[2px] p-[2px]">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-white rounded-lg border overflow-hidden"
        >
          {/* Post image */}
          <div 
            className="cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <img 
              src={post.image} 
              alt={post.description}
              className="w-full h-[340px] sm:h-[380px] object-cover" 
              // ⬆️ Increased image size (340px mobile, 380px on bigger screens)
            />
          </div>

          {/* Content */}
          <div className="p-1 space-y-1">
            {/* User info */}
            <div className="flex items-center space-x-1.5">
              <Avatar className="w-7 h-7">
                <AvatarImage src={post.avatar} />
                <AvatarFallback>{post.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium truncate">{post.username}</p>
                <p className="text-xs text-gray-500 truncate">{post.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between text-gray-600 mt-1 px-1">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.comments}</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer">
                <Share className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
