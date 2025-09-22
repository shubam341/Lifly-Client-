export const authFetch = async (url: string, options: RequestInit = {}, token: string) => {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};
