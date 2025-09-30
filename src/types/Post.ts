export interface Comment {
  id: number;
  username: string;
  avatar: string;
  comment: string;
  likes: number;
  timestamp: string;
}

export interface Post {
  id: string;           // maps to _id
  title: string;        // backend title
  username: string;     // backend authorName
  avatar: string;       // backend authorAvatar
  description: string;  // backend bio
  image: string;        // backend mediaUrl
  category: string;     // backend category
  likes: number;        // backend likesCount
  comments: number;     // backend commentsCount
  createdAt: string;    // backend createdAt
  isFollowed?: boolean; // optional
  tabs?: string[];      // optional
  commentsList?: Comment[];
}
