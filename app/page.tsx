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

    // DUMMY response abhi — baad mein Sabiha ke real /ask se replace karenge
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "هي هڪ آزمائشي جواب آهي." },
      ]);
      setLoading(false);
    }, 1000);
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
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && <p>...لکجي رهيو آهي</p>}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: "10px", fontSize: "18px", textAlign: "right" }}
          placeholder="پنهنجو سوال لکو..."
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px", fontSize: "16px" }}>
          موڪليو
        </button>
      </div>
    </main>
  );
}
