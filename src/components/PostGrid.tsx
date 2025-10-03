import { Heart, MessageCircle, Share } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Post } from "@/types/Post";

interface PostGridProps {
  posts: Post[];
}

// Generate color from string for category
const getCategoryColor = (category: string) => {
  const colors = [
    "bg-red-200 text-red-800",
    "bg-green-200 text-green-800",
    "bg-blue-200 text-blue-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
    "bg-indigo-200 text-indigo-800",
  ];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handleShare = async (postId: string) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Check out this post", url: postUrl });
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg border overflow-hidden">
          {/* Post image */}
          <div
            className="cursor-pointer hover:opacity-90 transition-opacity duration-200"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <img
              src={post.image || "/fallback-image.png"}
              alt={post.description || "Post image"}
              className="w-full h-[340px] sm:h-[380px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-2 space-y-1">
            {/* Title + Category */}
            <div className="flex justify-between items-center">
              <p className="text-base font-bold text-black truncate">{post.title}</p>
              {post.category && (
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getCategoryColor(
                    post.category
                  )}`}
                >
                  {post.category}
                </span>
              )}
            </div>

            {/* Author info */}
            <div className="flex items-center space-x-1 mt-1">
              <Avatar className="w-6 h-6">
                <AvatarFallback>{post.username ? post.username[0] : "U"}</AvatarFallback>
              </Avatar>
              <p className="text-xs text-gray-500 truncate">{post.username}</p>
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
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => handleShare(post.id)}
              >
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

// import { Heart, MessageCircle, Share } from "lucide-react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { useNavigate } from "react-router-dom";
// import { Post } from "@/types/Post";

// interface PostGridProps {
//   posts: Post[];
//   handleLike: (postId: string) => void; // ✅ add handleLike prop
// }

// // Generate color from string for category
// const getCategoryColor = (category: string) => {
//   const colors = [
//     "bg-red-200 text-red-800",
//     "bg-green-200 text-green-800",
//     "bg-blue-200 text-blue-800",
//     "bg-yellow-200 text-yellow-800",
//     "bg-purple-200 text-purple-800",
//     "bg-pink-200 text-pink-800",
//     "bg-indigo-200 text-indigo-800",
//   ];
//   let hash = 0;
//   for (let i = 0; i < category.length; i++) {
//     hash = category.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   const index = Math.abs(hash) % colors.length;
//   return colors[index];
// };

// const PostGrid: React.FC<PostGridProps> = ({ posts, handleLike }) => {
//   const navigate = useNavigate();

//   const handleShare = async (postId: string) => {
//     const postUrl = `${window.location.origin}/post/${postId}`;
//     if (navigator.share) {
//       try {
//         await navigator.share({ title: "Check out this post", url: postUrl });
//       } catch (err) {
//         console.error("Error sharing:", err);
//       }
//     } else {
//       try {
//         await navigator.clipboard.writeText(postUrl);
//         console.log("Post link copied to clipboard!");
//       } catch {
//         console.error("Failed to copy link");
//       }
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
//       {posts.map((post) => (
//         <div key={post.id} className="bg-white rounded-lg border overflow-hidden">
//           {/* Post image */}
//           <div
//             className="cursor-pointer hover:opacity-90 transition-opacity duration-200"
//             onClick={() => navigate(`/post/${post.id}`)}
//           >
//             <img
//               src={post.image || "/fallback-image.png"}
//               alt={post.description || "Post image"}
//               className="w-full h-[340px] sm:h-[380px] object-cover"
//             />
//           </div>

//           {/* Content */}
//           <div className="p-2 space-y-1">
//             {/* Title + Category */}
//             <div className="flex justify-between items-center">
//               <p className="text-base font-bold text-black truncate">{post.title}</p>
//               {post.category && (
//                 <span
//                   className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getCategoryColor(
//                     post.category
//                   )}`}
//                 >
//                   {post.category}
//                 </span>
//               )}
//             </div>

//             {/* Author info */}
//             <div className="flex items-center space-x-1 mt-1">
//               <Avatar className="w-6 h-6">
//                 <AvatarFallback>{post.username ? post.username[0] : "U"}</AvatarFallback>
//               </Avatar>
//               <p className="text-xs text-gray-500 truncate">{post.username}</p>
//             </div>

//             {/* Stats */}
//             <div className="flex justify-between text-gray-600 mt-1 px-1">
//               <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleLike(post.id)}>
//                 <Heart
//                   className={`w-4 h-4 ${post.isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
//                 />
//                 <span className="text-sm">{post.likes}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <MessageCircle className="w-4 h-4" />
//                 <span className="text-sm">{post.comments}</span>
//               </div>
//               <div
//                 className="flex items-center space-x-1 cursor-pointer"
//                 onClick={() => handleShare(post.id)}
//               >
//                 <Share className="w-4 h-4" />
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostGrid;
