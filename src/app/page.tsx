"use client";

import { useState, useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am your company policy assistant. How can I help you today?",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");

    const thinkingMessage = { sender: "bot", text: "🤔 Thinking..." };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: data.answer },
      ]);
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = {
        sender: "bot",
        text: "❌ Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev.slice(0, -1), errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl h-[80vh] bg-white rounded-xl shadow-lg flex flex-col">
        <header className="text-xl font-bold text-center py-4 border-b">
          📘 Company Policy Chat Assistant
        </header>

        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex items-center gap-2 bg-white">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about company policy..."
            className="flex-1 px-4 py-2 border rounded-lg text-black bg-white focus:outline-none focus:ring focus:ring-blue-300"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-full"
          >
            {loading ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
      </div>
    </main>
  );
}
