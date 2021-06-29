import { apiKey, baseTrendingURL } from "../constants";

export async function getTrendingGifs() {
  return await fetch(
    `${baseTrendingURL}${apiKey}&limit=5&rating=g&lang=en`
  ).then((res) => res.json());
}
