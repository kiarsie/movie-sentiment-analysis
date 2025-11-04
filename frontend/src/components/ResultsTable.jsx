import React from "react";

export default function ResultsTable({ posts }) {
  return (
    <div className="table-wrapper">
      <table className="table">
      <thead>
        <tr style={{ textAlign: "left" }}>
          <th>Title</th>
          <th style={{ width: 120 }}>Subreddit</th>
          <th style={{ width: 100 }}>Reddit score</th>
          <th style={{ width: 180 }}>Sentiment</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((p) => (
          <tr key={p.post_id}>
            <td><a href={p.url} target="_blank" rel="noreferrer">{p.title}</a></td>
            <td><span className="sub-pill">{p.subreddit}</span></td>
            <td>{p.reddit_score.toLocaleString?.() || p.reddit_score}</td>
            <td>
              <span className={`badge ${p.sentiment === 'positive' ? 'pos' : p.sentiment === 'negative' ? 'neg' : 'neu'}`}>
                {p.sentiment} · {p.confidence.toFixed(2)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
