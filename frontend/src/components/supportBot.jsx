import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, ArrowLeft, X, Send, Mail } from "lucide-react";

const ChatboxWidget = () => {
  const [chatState, setChatState] = useState("closed");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Resume Builder! How can I help you create an amazing resume today?",
      sender: "bot",
      timestamp: "4:53 PM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const instantAnswers = [
    "How do I create a resume?",
    "What templates are available?",
    "Can I customize my resume design?",
    "How do I download my resume?",
    "Is the resume builder free?",
    "What format can I export to?",
    "How do I add work experience?",
    "Can I save multiple versions?",
  ];

  const botResponses = {
    "How do I create a resume?":
      "Creating a resume is easy! Simply click 'Create Resume' on our homepage...",
    "What templates are available?":
      "We offer 25+ professional resume templates including Modern, Classic...",
    "Can I customize my resume design?":
      "Absolutely! You can customize colors, fonts, spacing...",
    "How do I download my resume?":
      "Once you're satisfied with your resume, click the 'Download' button...",
    "Is the resume builder free?":
      "Yes, our basic resume builder is completely free...",
    "What format can I export to?":
      "You can export your resume in PDF, Word, text, and HTML formats...",
    "How do I add work experience?":
      "Click 'Add Experience' and fill in job title, company, dates, and more...",
    "Can I save multiple versions?":
      "Yes! You can save multiple resume versions for different jobs...",
  };

  const openChatWidget = () => setChatState("widget");
  const closeChatWidget = () => setChatState("closed");
  const openChatInterface = () => setChatState("interface");
  const closeChatInterface = () => setChatState("closed");
  const backToChatWidget = () => setChatState("widget");

  const addMessage = (text, sender) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleBotResponse = (question) => {
    setTimeout(() => {
      const response =
        botResponses[question] ||
        "Thank you for your question. Our team will get back to you shortly!";
      addMessage(response, "bot");
    }, 1000);
  };

  const selectQuestion = (question) => {
    openChatInterface();
    setTimeout(() => {
      addMessage(question, "user");
      handleBotResponse(question);
    }, 300);
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, "user");
      const response =
        botResponses[inputMessage] ||
        "Thank you for your message. Our team will get back to you shortly!";
      setTimeout(() => {
        addMessage(response, "bot");
      }, 1000);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-5 sm:right-5 z-50 font-sans w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg px-2 sm:px-0 flex flex-col items-end">
      {/* Chat Icon */}
      {chatState === "closed" && (
        <div
          className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-all duration-300"
          onClick={openChatWidget}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      )}

      {/* Chat Widget */}
      {chatState === "widget" && (
        <div className="bg-gray-900 text-white rounded-2xl p-4 sm:w-[78%] w-full sm:h-[488px] h-auto  shadow-xl animate-in slide-in-from-bottom-2 duration-300">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Chat with us</h2>
            <p className="text-sm text-gray-300 mt-1">
              👋 Need help building your resume? Let’s chat!
            </p>
          </div>

          <button
            className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-xl py-2.5 text-sm mb-4"
            onClick={openChatInterface}
          >
            Return to chat
          </button>

          <div className="bg-white text-gray-800 rounded-xl p-4 sm:h-[300px] h-auto overflow-y-auto">
            <h3 className="text-base font-semibold text-center mb-3">
              Instant answers
            </h3>
            <div className="space-y-2">
              {instantAnswers.map((q, i) => (
                <button
                  key={i}
                  onClick={() => selectQuestion(q)}
                  className="w-full text-left text-sm py-2 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {chatState === "interface" && (
        <div className="bg-white rounded-2xl w-full h-[75vh] max-h-screen shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <button
              className="p-1 hover:bg-gray-700 rounded-full"
              onClick={backToChatWidget}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="font-semibold text-base truncate">
              Resume Builder Support
            </div>
            <button
              className="p-1 hover:bg-gray-700 rounded-full"
              onClick={closeChatInterface}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Newsletter CTA */}
          <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600 mb-2">
              Want resume tips & updates? Subscribe!
            </p>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-gray-700">
              <Mail className="w-4 h-4" />
              Get Resume Tips
            </button>
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a message"
              className="flex-1 border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatboxWidget;
