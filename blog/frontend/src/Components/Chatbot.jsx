import { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([{ role: "bot", text: "AI Assistant at your service! How can I help you today?" }]);
    const [open, setOpen] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);

        const res = await axios.post(`${import.meta.env.VITE_APP_REQUEST_API}/api/chat`, {
            message: input,
        });

        const botMsg = { role: "bot", text: res.data.reply };
        setMessages(prev => [...prev, botMsg]);

        setInput("");
    };

    return (
        <>
            {/* Floating Button */}
            <button
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-500 text-white w-17 h-17 rounded-full shadow-lg text-2xl flex items-center justify-center transition-transform hover:scale-110"
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <i className="fa-solid fa-comments w-10 h-7"></i>
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-white/90 backdrop-blur-lg border border-gray-300 shadow-2xl rounded-xl flex flex-col animate-scaleUp">
                    {/* Header */}
                    <div className="bg-green-400 text-white px-4 py-2 flex justify-between items-center rounded-t-xl">
                        <h3 className="font-semibold">Gemini Assistant</h3>
                        <button onClick={() => {
                            setOpen(false);
                            setMessages([]);
                        }} className="text-lg">X</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`px-3 py-2 rounded-lg max-w-[85%] ${msg.role === "user"
                                    ? "bg-indigo-100 self-end ml-auto"
                                    : "bg-gray-200 self-start"
                                    }`}
                            >
                                <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="border-t flex">
                        <input
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="w-14 bg-green-400 text-white flex items-center justify-center"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chatbot;
