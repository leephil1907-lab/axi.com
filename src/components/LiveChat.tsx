import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Hi! Welcome to Axi. How can we help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thank you for your message. One of our support agents will be with you shortly." },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-20 right-4 z-[90] w-[320px] rounded-xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "#fff", border: "1px solid #D9D3CB" }}
        >
          <div className="p-4 flex items-center justify-between" style={{ backgroundColor: "#D31C2B" }}>
            <span className="text-sm font-semibold text-white">Axi Support</span>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="h-[300px] overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-3 py-2 rounded-lg text-sm"
                  style={{
                    backgroundColor: msg.from === "user" ? "#D31C2B" : "#F5F2ED",
                    color: msg.from === "user" ? "#fff" : "#1A1A1A",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2" style={{ borderTop: "1px solid #D9D3CB" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30"
              style={{ borderColor: "#D9D3CB" }}
            />
            <button onClick={sendMessage} className="p-2 rounded-lg text-white" style={{ backgroundColor: "#D31C2B" }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-[90] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: "#D31C2B" }}
      >
        {open ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </button>
    </>
  );
}
