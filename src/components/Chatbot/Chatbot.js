import { useState, useRef, useEffect, useCallback } from "react";
import { TbRobot, TbSend } from "react-icons/tb";
import "./Chatbot.css";

const SUGGESTIONS = [
  "Who is Dakshi?",
  "What has she built?",
  "What's her tech stack?",
  "Is she open to opportunities?",
  "Tell me about her research",
];

function LoadingDots() {
  return (
    <div className="msg-row assistant">
      <div className="chatbot-dots">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    setInput("");
    const userMsg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
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

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI assistant"
      >
        <TbRobot />
      </button>

      {isOpen && (
        <div className="chatbot-backdrop" onClick={handleBackdropClick}>
          <div className="chatbot-modal" ref={modalRef}>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-avatar-ring">
                <TbRobot />
              </div>
              <h2 className="chatbot-name">DAKSHI AI</h2>
              <p className="chatbot-subtitle">AI assistant for Dakshi</p>
            </div>

            {/* Chat area */}
            <div className="chatbot-messages">
              {messages.length === 0 && !loading ? (
                <div className="chatbot-empty">
                  <p className="chatbot-empty-prompt">
                    Ask anything about Dakshi or her work
                  </p>
                  <div className="chatbot-suggestions">
                    {SUGGESTIONS.map((q) => (
                      <button
                        key={q}
                        className="suggestion-pill"
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
                    <div key={i} className={`msg-row ${msg.role}`}>
                      <div className="msg-bubble">{msg.content}</div>
                    </div>
                  ))}
                  {loading && <LoadingDots />}
                  {error && <p className="chatbot-error">{error}</p>}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-row">
              <textarea
                ref={inputRef}
                className="chatbot-textarea"
                rows={1}
                placeholder="Ask me anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="chatbot-send-btn"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                aria-label="Send"
              >
                <TbSend />
              </button>
            </div>

            <p className="chatbot-hint">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      )}
    </>
  );
}
