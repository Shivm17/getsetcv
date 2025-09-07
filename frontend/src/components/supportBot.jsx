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

  ];

  const botResponses = {
    "How do I create a resume?":
      "Creating a resume is easy! Simply click 'Create Resume' on our homepage and follow the step-by-step guide. You can choose a template, fill in your details, and see a preview in real-time.",
    "What templates are available?":
      "We offer over 25 professionally designed resume templates. Our collection includes Modern, Classic, Creative, and Minimalist styles to suit various industries and job roles.",
    "Can I customize my resume design?":
      "Absolutely! Our builder allows you to customize colors, fonts, spacing, and sections. You can create a personalized resume that reflects your unique professional brand.",
    "How do I download my resume?":
      "Once you're satisfied with your resume, click the 'Download' button. You can export your resume in PDF, Word, and other formats, ready for job applications.",
    "Is the resume builder free?":
      "Yes, our basic resume builder is completely free to use. It includes access to all our templates and standard customization options.",
    "What format can I export to?":
      "You can export your resume in PDF, Word, text, and HTML formats, ensuring compatibility with online application systems.",
    "How do I add work experience?":
      "In the editor, navigate to the 'Work Experience' section and click 'Add New'. You can then fill in the job title, company, dates of employment, and your key responsibilities and achievements.",
    "Can I save multiple versions?":
      "Yes! With a free account, you can save multiple versions of your resume. This is useful for tailoring your resume to different job applications.",
  };

  const openChatWidget = () => setChatState("widget");
  const closeChatWidget = () => setChatState("closed");
  const openChatInterface = () => setChatState("interface");
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
    setMessages([
      {
        id: 1,
        text: "Welcome to Resume Builder! How can I help you create an amazing resume today?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
    ]);
    openChatInterface();
    setTimeout(() => {
      addMessage(question, "user");
      handleBotResponse(question);
    }, 300);
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, "user");
      handleBotResponse(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans flex flex-col items-end w-[calc(100%-2rem)] max-w-sm">
      {/* Chat Icon */}
      {chatState === "closed" && (
        <div
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300"
          onClick={openChatWidget}
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
      )}

      {/* Chat Widget */}
      {chatState === "widget" && (
        <div className="bg-gray-900 text-white rounded-2xl w-full max-w-sm h-auto shadow-xl animate-in slide-in-from-bottom-5 duration-300 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Chat with us</h2>
              <p className="text-sm text-gray-300 mt-1">
                👋 Need help building your resume?
              </p>
            </div>
            <button
              className="p-2 cursor-pointer hover:bg-gray-700 rounded-full"
              onClick={closeChatWidget}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 mx-4 bg-white text-gray-800 rounded-xl m-2 mt-0">
            <h3 className="text-base font-semibold text-center mb-3">
              Instant answers
            </h3>
            <div className="space-y-2">
              {instantAnswers.map((q, i) => (
                <button
                  key={i}
                  onClick={() => selectQuestion(q)}
                  className="w-full cursor-pointer text-left text-sm py-2 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <button
            className="text-white text-sm py-2.5 mx-2 mb-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors"
            onClick={openChatInterface}
          >
            Start a new chat
          </button>
        </div>
      )}

      {/* Chat Interface */}
      {chatState === "interface" && (
        <div className="bg-white rounded-2xl w-full h-[85vh] sm:h-[75vh] max-h-[600px] shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gray-900 text-white p-3 flex justify-between items-center shrink-0">
            <button
              className="p-2 cursor-pointer hover:bg-gray-700 rounded-full"
              onClick={backToChatWidget}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="font-semibold text-base truncate">
              Resume Builder Support
            </div>
            <button
              className="p-2 cursor-pointer hover:bg-gray-700 rounded-full"
              onClick={closeChatWidget}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="w-10 cursor-pointer h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shrink-0 transition-colors"
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