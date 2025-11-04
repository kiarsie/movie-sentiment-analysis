// Use Vite env variable or fallback to localhost
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Analyze a query on Reddit
 * @param {string} query - search term
 * @param {string} subreddit - subreddit name, default "all"
 * @param {number} limit - max posts to fetch, default 100
 * @param {string} time_filter - "all", "day", "week", etc.
 * @param {boolean} include_comments - whether to include comments
 * @returns JSON response from backend
 */
export async function analyze(query, subreddit = "all", limit = 100, time_filter = "all", include_comments = false) {
  const url = `${BASE}/analyze?query=${encodeURIComponent(query)}&subreddit=${encodeURIComponent(subreddit)}&limit=${limit}&time_filter=${time_filter}&include_comments=${include_comments}`;
  console.log(`[API] Searching for "${query}" in ${subreddit === 'all' ? 'all subreddits' : `r/${subreddit}`} (limit=${limit}), comments=${include_comments}`);
  
  try {
    // Set timeout (5 min if comments, 2 min otherwise)
    const timeoutMs = include_comments ? 300_000 : 120_000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
    
  } catch (error) {
    if (error.name === "AbortError") {
      const timeoutMinutes = include_comments ? 5 : 2;
      throw new Error(`Request timed out after ${timeoutMinutes} minutes. Try disabling comments for faster results.`);
    }
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(`Failed to connect to backend at ${BASE}. Make sure the server is running and accessible.`);
    }
    throw error;
  }
}
