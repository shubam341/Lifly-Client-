// src/data/postData.ts

export interface Comment {
  id: number;
  username: string;
  avatar: string;
  comment: string;
  likes: number;
  timestamp: string;
}

export interface Post {
  id: number;
  username: string;
  avatar: string;
  description: string;
  likes: string;
  comments: string; // total comments count (string like "4,335")
  isFollowed: boolean;
  image: string;
  category: string;
  tabs: string[];
  commentsList: Comment[];
}

export const dummyPosts: Post[] = [
  // ---------- For You ----------
// ---------- Fashion ----------
{
  id: 1,
  username: "StyleGuru",
  avatar: "https://i.pravatar.cc/150?img=51",
  description: "Top 5 streetwear trends of 2025 👟",
  likes: "18.4K",
  comments: "2,123",
  isFollowed: true,
  image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&w=400",
  category: "Fashion",
  tabs: ["Explore", "Following"],
  commentsList: [
    { id: 1, username: "TrendyChic", avatar: "https://i.pravatar.cc/150?img=52", comment: "These looks are 🔥", likes: 20, timestamp: "1h" },
    { id: 2, username: "UrbanFit", avatar: "https://i.pravatar.cc/150?img=53", comment: "I need those sneakers!", likes: 12, timestamp: "45m" },
  ],
},
{
  id: 2,
  username: "RunwayQueen",
  avatar: "https://i.pravatar.cc/150?img=54",
  description: "Evening gowns that slay ✨",
  likes: "22.7K",
  comments: "3,012",
  isFollowed: false,
  image: "https://images.pexels.com/photos/2892257/pexels-photo-2892257.jpeg?auto=compress&w=400",
  category: "Fashion",
  tabs: ["Explore"],
  commentsList: [
    { id: 1, username: "FashionIcon", avatar: "https://i.pravatar.cc/150?img=55", comment: "Love this fit!", likes: 15, timestamp: "2h" },
  ],
},

// ---------- Personal care ----------
{
  id: 3,
  username: "SkincareDaily",
  avatar: "https://i.pravatar.cc/150?img=56",
  description: "Morning skincare routine 🌞",
  likes: "12.1K",
  comments: "1,045",
  isFollowed: true,
  image: "https://images.pexels.com/photos/3738348/pexels-photo-3738348.jpeg?auto=compress&w=400",
  category: "Personal care",
  tabs: ["Explore"],
  commentsList: [
    { id: 1, username: "GlowGirl", avatar: "https://i.pravatar.cc/150?img=57", comment: "Saved my skin!", likes: 8, timestamp: "3h" },
  ],
},
{
  id: 4,
  username: "SelfCareHub",
  avatar: "https://i.pravatar.cc/150?img=58",
  description: "5-min self-care before bed 🌙",
  likes: "7.8K",
  comments: "823",
  isFollowed: false,
  image: "https://images.pexels.com/photos/3738348/pexels-photo-3738348.jpeg?auto=compress&w=400",
  category: "Personal care",
  tabs: ["Explore", "Following"],
  commentsList: [
    { id: 1, username: "RelaxMode", avatar: "https://i.pravatar.cc/150?img=59", comment: "I needed this 🫶", likes: 6, timestamp: "1h" },
  ],
},

// ---------- Food ----------
{
  id: 5,
  username: "FoodCravings",
  avatar: "https://i.pravatar.cc/150?img=60",
  description: "Homemade pizza recipe 🍕",
  likes: "15.6K",
  comments: "2,214",
  isFollowed: false,
  image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&w=400",
  category: "Food",
  tabs: ["Explore"],
  commentsList: [
    { id: 1, username: "YumBites", avatar: "https://i.pravatar.cc/150?img=61", comment: "Looks delicious!", likes: 10, timestamp: "2h" },
  ],
},
{
  id: 6,
  username: "StreetEats",
  avatar: "https://i.pravatar.cc/150?img=62",
  description: "Bangkok street food tour 🍜",
  likes: "21.3K",
  comments: "3,105",
  isFollowed: true,
  image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&w=400",
  category: "Food",
  tabs: ["Explore", "Nearby"],
  commentsList: [
    { id: 1, username: "TastyTraveler", avatar: "https://i.pravatar.cc/150?img=63", comment: "My dream trip!", likes: 14, timestamp: "3h" },
  ],
},

// ---------- Home ----------
{
  id: 7,
  username: "CozyCorner",
  avatar: "https://i.pravatar.cc/150?img=64",
  description: "Minimalist living room design 🏡",
  likes: "9.4K",
  comments: "1,102",
  isFollowed: true,
  image: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&w=400",
  category: "Home",
  tabs: ["Explore"],
  commentsList: [
    { id: 1, username: "DesignLover", avatar: "https://i.pravatar.cc/150?img=65", comment: "So aesthetic!", likes: 7, timestamp: "2h" },
  ],
},
{
  id: 8,
  username: "DecorDreams",
  avatar: "https://i.pravatar.cc/150?img=66",
  description: "DIY wall art ideas 🎨",
  likes: "11.6K",
  comments: "1,452",
  isFollowed: false,
  image: "https://images.pexels.com/photos/128204/pexels-photo-128204.jpeg?auto=compress&w=400",
  category: "Home",
  tabs: ["Explore", "Following"],
  commentsList: [
    { id: 1, username: "CreativeMind", avatar: "https://i.pravatar.cc/150?img=67", comment: "This is amazing!", likes: 9, timestamp: "1h" },
  ],
},

// ---------- Health ----------
{
  id: 9,
  username: "FitLife",
  avatar: "https://i.pravatar.cc/150?img=68",
  description: "10-min morning yoga 🧘",
  likes: "13.2K",
  comments: "1,345",
  isFollowed: true,
  image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=400",
  category: "Health",
  tabs: ["Explore"],
  commentsList: [
    { id: 1, username: "YogaFan", avatar: "https://i.pravatar.cc/150?img=69", comment: "Feeling relaxed already!", likes: 10, timestamp: "1h" },
  ],
},
{
  id: 10,
  username: "HealthyHabits",
  avatar: "https://i.pravatar.cc/150?img=70",
  description: "Smoothie recipes for energy 🥤",
  likes: "17.5K",
  comments: "2,121",
  isFollowed: false,
  image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=400",
  category: "Health",
  tabs: ["Explore", "Following"],
  commentsList: [
    { id: 1, username: "WellnessWarrior", avatar: "https://i.pravatar.cc/150?img=71", comment: "I make this daily!", likes: 12, timestamp: "2h" },
  ],
},

// ---------- Travel ----------
{
  id: 11,
  username: "WanderWorld",
  avatar: "https://i.pravatar.cc/150?img=72",
  description: "Exploring Santorini 🌊",
  likes: "28.9K",
  comments: "3,502",
  isFollowed: true,
  image: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&w=400",
  category: "Travel",
  tabs: ["Explore", "Nearby"],
  commentsList: [
    { id: 1, username: "TravelBug", avatar: "https://i.pravatar.cc/150?img=73", comment: "My bucket list ❤️", likes: 18, timestamp: "4h" },
  ],
},
{
  id: 12,
  username: "BackpackStories",
  avatar: "https://i.pravatar.cc/150?img=74",
  description: "Camping in the Rockies 🏔️",
  likes: "19.3K",
  comments: "2,013",
  isFollowed: false,
  image: "https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?auto=compress&w=400",
  category: "Travel",
  tabs: ["Explore", "Following"],
  commentsList: [
    { id: 1, username: "AdventureFan", avatar: "https://i.pravatar.cc/150?img=75", comment: "So peaceful!", likes: 14, timestamp: "2h" },
  ],
},

];































