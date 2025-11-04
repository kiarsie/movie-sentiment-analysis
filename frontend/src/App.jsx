import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import StatsCards from "./components/StatsCards";
import SentimentChart from "./components/SentimentChart";
import ResultsTable from "./components/ResultsTable";
import { analyze } from "./api";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch(query, subreddit, time_filter="all") {
    setError(null);
    setLoading(true);
    const limit = 100; // Fixed at 100
    const include_comments = false; // Always false
    console.log(`[App] Starting search: query="${query}", subreddit="${subreddit}", limit=${limit}, time_filter="${time_filter}"`);
    try {
      const resp = await analyze(query, subreddit, limit, time_filter, include_comments);
      console.log(`[App] Search complete: Found ${resp.posts?.length || 0} posts from r/${resp.subreddit}`);
      setData(resp);
    } catch (e) {
      console.error(`[App] Search error:`, e);
      setError(e.message || e.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Reddit Stock Sentiment (r/wallstreetbets · r/stocks · r/investing)</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <div style={{ 
          padding: "32px", 
          textAlign: "center",
          background: "var(--bg-card)",
          borderRadius: "12px",
          boxShadow: "var(--shadow)",
          border: "1px solid var(--border)",
          marginTop: "24px"
        }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            border: "4px solid var(--border)",
            borderTopColor: "var(--primary)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }}></div>
          <p style={{ margin: "0 0 8px", fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
            Loading posts and analyzing sentiment...
          </p>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            This may take 30 seconds to 5 minutes depending on settings.
            <br />
            Check the backend terminal for progress logs.
          </p>
        </div>
      )}
      {error && (
        <div style={{ 
          color: "#ef4444", 
          padding: "16px", 
          background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
          borderRadius: "12px",
          border: "1px solid #fca5a5",
          marginTop: "24px",
          fontWeight: 500
        }}>
          {error}
        </div>
      )}
      {data && (
        <>
          {data.posts && data.posts.length > 0 ? (
            <>
              <StatsCards counts={data.counts} />
              <SentimentChart counts={data.counts} />
              <ResultsTable posts={data.posts} />
            </>
          ) : (
            <div style={{ 
              padding: "48px 24px", 
              textAlign: "center",
              background: "var(--bg-card)",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              border: "1px solid var(--border)",
              marginTop: "24px"
            }}>
              <p style={{ margin: 0, fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                No posts found matching <strong style={{ color: "var(--text-primary)" }}>"{data.query}"</strong> in <strong style={{ color: "var(--text-primary)" }}>r/{data.subreddit}</strong>.
              </p>
              <p style={{ margin: "8px 0 0", fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
                Try a different search term or subreddit.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
