import axios from "axios";

const BASE_URL = import.meta.env.VITE_LIKES_SERVICE_URL;

export const getLikes = async (postId: string, token: string) => {
  const res = await axios.get(`${BASE_URL}/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { count, likes }
};

export const addLike = async (postId: string, userId: string, token: string) => {
  if (!userId) throw new Error("UserId is required");

  const res = await axios.post(
    `${BASE_URL}/`,
    { postId, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const removeLike = async (postId: string, userId: string, token: string) => {
  if (!userId) throw new Error("UserId is required");

  const res = await axios.delete(`${BASE_URL}/`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { postId, userId },
  });
  return res.data;
};
