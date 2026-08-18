export const getApiUrl = (endpoint: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  return `${baseUrl}${endpoint}`;
};
