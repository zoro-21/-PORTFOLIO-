import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Terrigraphic's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    greeting: [
      "Hello! Welcome to Terrigraphic's portfolio. What would you like to know?",
      "Hi there! I'm here to help you explore Terrigraphic's work. What interests you?",
      "Hey! Thanks for visiting. How can I assist you today?"
    ],
    portfolio: [
      "Terrigraphic specializes in 3D art, web development, digital design, and interactive media. Which area interests you most?",
      "The portfolio includes 8 amazing projects ranging from React applications to VR experiences. Would you like details about any specific project?",
      "You can explore projects in Web Development, 3D Art, Digital Design, and Interactive categories. What catches your eye?"
    ],
    skills: [
      "Terrigraphic's expertise includes React, TypeScript, Three.js, Node.js, WebGL, and many creative tools. Any specific technology you'd like to know about?",
      "The skill set covers both technical development (React, Three.js, WebGL) and creative design (3D modeling, motion graphics). What interests you?",
      "From full-stack development to 3D art creation, there's a wide range of capabilities. Which area would you like to explore?"
    ],
    contact: [
      "You can reach out through the contact form on this website, or connect on social media. Would you like me to guide you to the contact page?",
      "For collaborations or inquiries, the contact section has all the details. Shall I help you get there?",
      "Feel free to get in touch for any projects or questions. The contact form is just a click away!"
    ],
    default: [
      "That's an interesting question! Could you tell me more about what you're looking for?",
      "I'd love to help! Can you be more specific about what you'd like to know?",
      "Great question! What aspect of Terrigraphic's work are you most curious about?"
    ]
  };

  const getRandomResponse = (category: keyof typeof botResponses): string => {
    const responses = botResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return getRandomResponse('greeting');
    } else if (message.includes('portfolio') || message.includes('project') || message.includes('work')) {
      return getRandomResponse('portfolio');
    } else if (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('react') || message.includes('three')) {
      return getRandomResponse('skills');
    } else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      return getRandomResponse('contact');
    } else if (message.includes('chat') || message.includes('real-time')) {
      return "The Real-time Chat Application is one of the featured projects! It includes video calls, file sharing, and real-time messaging using React, Socket.io, Node.js, and WebRTC. Pretty cool, right?";
    } else if (message.includes('3d') || message.includes('art')) {
      return "The 3D art projects are amazing! From interactive particle systems to geometric art generators, all created with Three.js and WebGL. Which 3D project interests you most?";
    } else if (message.includes('vr') || message.includes('virtual reality')) {
      return "The VR Museum Experience is currently in progress! It's an immersive virtual reality tour with interactive exhibits built using A-Frame and WebXR. Exciting stuff!";
    } else {
      return getRandomResponse('default');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Tell me about the portfolio",
    "What technologies are used?",
    "How can I contact?",
    "Show me 3D projects"
  ];

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div className="bot-avatar">🤖</div>
            <div>
              <h3>Terrigraphic Assistant</h3>
              <span className="status">● Online</span>
            </div>
          </div>
          <button
            className="close-chat"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-actions">
            <p>Quick questions:</p>
            <div className="quick-buttons">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chatbot-input">
          <div className="input-container">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="send-button"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
