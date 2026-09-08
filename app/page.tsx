"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://naari-ai-production.up.railway.app/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, language: "sindhi" }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "معاف ڪجو، ڪا خرابي آئي آهي." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "20px", fontSize: "18px", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ minHeight: "300px", marginBottom: "20px" }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: "right",
              margin: "10px 0",
              padding: "10px",
              background: m.role === "user" ? "#e0f0ff" : "#f0f0f0",
              borderRadius: "8px",
              color: "#000000",
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && <p style={{ color: "#ffffff" }}>...لکجي رهيو آهي</p>}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "18px",
            textAlign: "right",
            color: "#000000",
            background: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
          placeholder="پنهنجو سوال لکو..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          موڪليو
        </button>
      </div>
    </main>
  );
}
