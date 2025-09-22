import { useAuth0 } from "@auth0/auth0-react";
import { authFetch } from "./useAuthFetch";  // import the function from authFetch.ts

export const useAuthFetch = () => {
  const { getAccessTokenSilently } = useAuth0();

  return async (url: string, options: RequestInit = {}) => {
    const token = await getAccessTokenSilently();
    return authFetch(url, options, token);
  };
};
