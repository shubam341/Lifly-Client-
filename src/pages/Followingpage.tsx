// import { Heart, MessageCircle, Share } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useNavigate } from "react-router-dom";
// import { Post } from "@/data/postData";

// interface PostGridProps {
//   posts: Post[];
// }

// const FollowingPage: React.FC<PostGridProps> = ({ posts }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="grid grid-cols-1 gap-1 p-3"> {/* ✅ decreased gap from 4 to 2 */}
//   {posts.map((post) => (
//     <div 
//       key={post.id} 
//       className="bg-white rounded-lg border overflow-hidden"
//     >
//       {/* Post image */}
//       <div 
//         className="aspect-[3/3] cursor-pointer"
//         onClick={() => navigate(`/post/${post.id}`)}
//       >
//         <img 
//           src={post.image} 
//           alt={post.description}
//           className="w-full h-full object-cover"
//         />
//       </div>
      
//       {/* Content */}
//       <div className="p-3 space-y-2">
//         {/* User info */}
//         <div className="flex items-center space-x-2">
//           <Avatar className="w-8 h-8">
//             <AvatarImage src={post.avatar} />
//             <AvatarFallback>{post.username[0]}</AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="text-sm font-medium truncate">{post.username}</p>
//             <p className="text-xs text-gray-500 truncate">{post.description}</p>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex justify-between text-gray-600 mt-1 px-1">
//           <div className="flex items-center space-x-1">
//             <Heart className="w-4 h-4" />
//             <span className="text-sm">{post.likes}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <MessageCircle className="w-4 h-4" />
//             <span className="text-sm">{post.comments}</span>
//           </div>
//           <div className="flex items-center space-x-1 cursor-pointer">
//             <Share className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//   );
// };

// export default FollowingPage;



import { Heart, MessageCircle, Share } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Post } from "@/data/postData";

interface PostGridProps {
  posts: Post[];
}

const FollowingPage: React.FC<PostGridProps> = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-1 p-3">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-white rounded-lg border overflow-hidden"
        >
          {/* Post image */}
          <div 
            className="aspect-[3/3] cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <img 
              src={post.image} 
              alt={post.description}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="p-3 space-y-2">
            {/* User info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {post.username[0].toUpperCase()}
              </div>
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

export default FollowingPage;
