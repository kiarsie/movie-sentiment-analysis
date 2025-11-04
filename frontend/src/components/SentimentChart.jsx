import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function SentimentChart({ counts }) {
  const data = [
    { name: "Positive", value: counts.positive, color: "#10b981" },
    { name: "Neutral", value: counts.neutral, color: "#6b7280" },
    { name: "Negative", value: counts.negative, color: "#ef4444" }
  ];
  return (
    <div style={{ 
      width: "100%", 
      height: 280, 
      marginBottom: 24,
      background: "var(--bg-card)",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "var(--shadow)",
      border: "1px solid var(--border)"
    }}>
      <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem", fontWeight: 600, color: "var(--text-primary)" }}>
        Sentiment Distribution
      </h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis 
            allowDecimals={false}
            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <Tooltip 
            contentStyle={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)"
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
