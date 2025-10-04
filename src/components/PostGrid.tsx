// import { Heart, MessageCircle, Share } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ✅ add AvatarImage

// import { useNavigate } from "react-router-dom";
// import { Post } from "@/types/Post";

// interface PostGridProps {
//   posts: Post[];
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

// const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
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
//      {/* Author info */}
// <div className="flex items-center space-x-1 mt-1">
//   <Avatar className="w-6 h-6">
//     {post.avatar ? (
//       <AvatarImage src={post.avatar} alt={post.username} />
//     ) : (
//       <AvatarFallback>{post.username ? post.username[0] : "U"}</AvatarFallback>
//     )}
//   </Avatar>
//   <p className="text-xs text-gray-500 truncate">{post.username}</p>
// </div>


//             {/* Stats */}
//             <div className="flex justify-between text-gray-600 mt-1 px-1">
//               <div className="flex items-center space-x-1">
//                 <Heart className="w-4 h-4" />
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



import { Heart, MessageCircle, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Post } from "@/types/Post";
import { useEffect, useState } from "react";
import { getLikes, addLike, removeLike } from "@/api/likeApi";
import { useAuth0 } from "@auth0/auth0-react";

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
const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [likesMap, setLikesMap] = useState<{ [key: string]: { count: number; liked: boolean } }>({});
  const [token, setToken] = useState<string | null>(null);

  // Fetch JWT token from Auth0
  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      }
    };
    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Fetch likes for all posts
  useEffect(() => {
    if (!token || !user) return;

    const fetchAllLikes = async () => {
      const newLikesMap: { [key: string]: { count: number; liked: boolean } } = {};
      for (let post of posts) {
        try {
          const res = await getLikes(post.id);
          const liked = res.likes.some((like: any) => like.userId === user.sub);
          newLikesMap[post.id] = { count: res.count, liked };
        } catch (err) {
          console.error("Error fetching likes:", err);
          newLikesMap[post.id] = { count: 0, liked: false };
        }
      }
      setLikesMap(newLikesMap);
    };

    fetchAllLikes();
  }, [posts, token, user]);

 const handleLike = async (postId: string) => {
  if (!isAuthenticated || !user) return alert("Login to like posts");

  const token = await getAccessTokenSilently(); // ✅ get token inside component
  const liked = likesMap[postId]?.liked;

  try {
    if (!liked) {
      await addLike(postId, user.sub, token);
    } else {
      await removeLike(postId, user.sub, token);
    }

    setLikesMap((prev) => ({
      ...prev,
      [postId]: {
        count: liked ? prev[postId].count - 1 : prev[postId].count + 1,
        liked: !liked,
      },
    }));
  } catch (err) {
    console.error("Error updating like:", err);
  }
};

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
                {post.avatar ? (
                  <AvatarImage src={post.avatar} alt={post.username} />
                ) : (
                  <AvatarFallback>{post.username ? post.username[0] : "U"}</AvatarFallback>
                )}
              </Avatar>
              <p className="text-xs text-gray-500 truncate">{post.username}</p>
            </div>

            {/* Stats */}
            <div className="flex justify-between text-gray-600 mt-1 px-1">
             <div
  className="flex items-center space-x-1 cursor-pointer"
  onClick={() => handleLike(post.id)}
>
  <Heart
    className="w-4 h-4"
    // ✅ Fill red if liked, outline otherwise
    style={{
      color: likesMap[post.id]?.liked ? "red" : "currentColor",
      fill: likesMap[post.id]?.liked ? "red" : "none",
    }}
  />
  <span className="text-sm">{likesMap[post.id]?.count || 0}</span>
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
