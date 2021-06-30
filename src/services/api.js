import { apiKey, baseTrendingURL, baseURL } from "../constants";

export async function getTrendingGifs() {
  return await fetch(
    `${baseTrendingURL}${apiKey}&limit=15&rating=g&lang=en`
  ).then((res) => res.json());
}

export async function getGifs(query) {
  return await fetch(
    `${baseURL}${apiKey}&q=${query}&limit=5&rating=g&lang=en`
  ).then((res) => res.json());
}
