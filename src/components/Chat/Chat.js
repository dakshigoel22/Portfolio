import { useState, useRef, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { TbRobot, TbSend } from "react-icons/tb";
import "./Chat.css";

const SUGGESTIONS = [
  "Who is Dakshi?",
  "What has she built?",
  "What's her tech stack?",
  "Is she open to opportunities?",
  "Tell me about her research",
];

function LoadingDots() {
  return (
    <div className="chat-msg-row assistant">
      <div className="chat-dots">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-10),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <section className="chat-page">
      <Container fluid className="chat-page-container">
        {/* Page header */}
        <div className="chat-page-header">
          <p className="chat-eyebrow">AI ASSISTANT</p>
          <h1 className="chat-heading">
            Chat<strong className="purple">.</strong>
          </h1>
          <p className="chat-subheading">
            Ask anything about Dakshi — her work, research, skills, or background.
          </p>
        </div>

        {/* Chat window */}
        <div className="chat-window">
          {/* Identity strip */}
          <div className="chat-identity">
            <div className="chat-avatar">
              <TbRobot />
            </div>
            <div>
              <p className="chat-identity-name">DAKSHI AI</p>
              <p className="chat-identity-sub">Powered by Groq · llama-3.3-70b</p>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && !loading ? (
              <div className="chat-empty">
                <p className="chat-empty-prompt">What would you like to know?</p>
                <div className="chat-suggestions">
                  {SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      className="chat-suggestion-pill"
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-msg-row ${msg.role}`}>
                    <div className="chat-bubble">{msg.content}</div>
                  </div>
                ))}
                {loading && <LoadingDots />}
                {error && <p className="chat-error">{error}</p>}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="chat-input-row">
              <textarea
                ref={inputRef}
                className="chat-textarea"
                rows={1}
                placeholder="Ask me anything about Dakshi…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="chat-send-btn"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                aria-label="Send"
              >
                <TbSend />
              </button>
            </div>
            <p className="chat-hint">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
