const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function analyze(query, subreddit="all", limit=100, time_filter="all", include_comments=false) {
  const url = `${BASE}/analyze?query=${encodeURIComponent(query)}&subreddit=${encodeURIComponent(subreddit)}&limit=${limit}&time_filter=${time_filter}&include_comments=${include_comments}`;
  console.log(`[API] Searching for "${query}" in ${subreddit === 'all' ? 'all subreddits' : `r/${subreddit}`} (100 posts), comments=${include_comments}`);
  try {
    // Longer timeout when comments are enabled (5 minutes), shorter otherwise (2 minutes)
    const timeoutSeconds = include_comments ? 300000 : 120000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutSeconds);
    
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      const timeoutMinutes = include_comments ? 5 : 2;
      throw new Error(`Request timed out after ${timeoutMinutes} minutes. Try disabling comments for faster results.`);
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Failed to connect to backend at ${BASE}. Make sure the server is running on port 8080.`);
    }
    throw error;
  }
}
