"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  Container,
  ChatBox,
  Header,
  ChatContent,
  MessageBubble,
  InputBar,
  FileUploadBar,
  TextInput,
  SendButton,
  UploadInput,
  UploadStatus,
  UploadLabel,
  UploadButton,
} from "./PolicyAssistant.styles";

export default function PolicyAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am your company policy assistant. How can I help you today?",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");

    const thinkingMessage = { sender: "bot", text: "🤔 Thinking..." };
    setMessages((prev) => [...prev, thinkingMessage]);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/ask";
      const res = await fetch(apiUrl, {
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    setUploadedFile(file.name);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      alert(result.message || "✅ File uploaded and processed successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Container>
      <ChatBox>
        <Header>Company Policy Chat Assistant</Header>

        <ChatContent ref={chatRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <MessageBubble $sender={msg.sender}>{msg.text}</MessageBubble>
            </div>
          ))}
        </ChatContent>

        <InputBar>
          <TextInput
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about company policy..."
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <SendButton onClick={handleSubmit} disabled={loading}>
            {loading ? <Pause size={20} /> : <Play size={20} />}
          </SendButton>
        </InputBar>

        <FileUploadBar>
          <UploadLabel>
            <UploadInput
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
            />
            <UploadButton>📁 Select File</UploadButton>
          </UploadLabel>

          <UploadStatus>
            {uploading
              ? "⏳ Uploading..."
              : uploadedFile
              ? `✅ ${uploadedFile}`
              : "No file selected"}
          </UploadStatus>
        </FileUploadBar>
      </ChatBox>
    </Container>
  );
}
