import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("TSLA");
  const [subreddit, setSubreddit] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  function submit() {
    if (!query) return;
    onSearch(query, subreddit, timeFilter);
  }

  return (
    <div>
      <div className="controls">
        <input 
          value={query} 
          onChange={e=>setQuery(e.target.value)} 
          placeholder="Ticker or company (e.g., TSLA, AAPL, NVDA)" 
          style={{ width: 360 }}
          onKeyPress={e => e.key === 'Enter' && submit()}
        />
        <select value={subreddit} onChange={e=>setSubreddit(e.target.value)} style={{ minWidth: 200 }}>
          <option value="all">All Subreddits</option>
          <option value="wallstreetbets">r/wallstreetbets</option>
          <option value="stocks">r/stocks</option>
          <option value="investing">r/investing</option>
        </select>
        <select value={timeFilter} onChange={e=>setTimeFilter(e.target.value)} style={{ minWidth: 120 }}>
          <option value="all">All Time</option>
          <option value="year">Past Year</option>
          <option value="month">Past Month</option>
          <option value="week">Past Week</option>
          <option value="day">Past Day</option>
        </select>
        <button onClick={submit} style={{ padding: "8px 20px", fontSize: "1em", fontWeight: 600 }}>Search</button>
      </div>
      <div style={{ marginTop: 12, fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>
        Searching: <strong style={{ color: "var(--text-primary)" }}>{subreddit === 'all' ? 'All subreddits (100 posts each)' : `r/${subreddit} (100 posts)`}</strong> • <strong style={{ color: "var(--text-primary)" }}>{timeFilter === 'all' ? 'All time' : timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}</strong>
      </div>
    </div>
  );
}
