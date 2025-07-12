import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart } from 'lucide-react';
import BreathingModal from '../components/BreathingModal';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

type ChatMode = 'friend' | 'listener' | 'advice';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm here to listen and support you. What's on your mind today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [chatMode, setChatMode] = useState<ChatMode>('friend');
  const [isTyping, setIsTyping] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateListenerResponse = (): string => {
    const responses = [
      "I'm here for you. Take your time.",
      "I'm listening. You're safe here.",
      "Thank you for sharing with me. I hear you.",
      "Take all the time you need. I'm here.",
      "I'm with you in this moment.",
      "Your feelings are valid. I'm listening.",
      "I hear you. You're not alone.",
      "Thank you for trusting me with this.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      let botResponse: string;
      
      if (chatMode === 'listener') {
        botResponse = generateListenerResponse();
      } else {
        // For friend and advice modes, this would be replaced with actual API call
        botResponse = `[${chatMode.toUpperCase()} MODE] This response would come from your ML API. User said: "${currentInput}"`;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] dark:bg-[#1E1B2E] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2E2E2E] dark:text-[#EDE9FE] mb-2">Chat Support</h1>
            <p className="text-gray-600 dark:text-gray-300">Choose your preferred conversation style below</p>
          </div>
          <button
            onClick={() => setShowBreathing(true)}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Heart size={18} className="animate-pulse" />
            <span>Breathe Now</span>
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { mode: 'friend' as ChatMode, label: 'Friend Mode', desc: 'Warm & supportive conversations' },
            { mode: 'listener' as ChatMode, label: 'Silent Listener', desc: 'Gentle & passive listening' },
            { mode: 'advice' as ChatMode, label: 'Advice Mode', desc: 'Helpful guidance & tips' },
          ].map(({ mode, label, desc }) => (
            <button
              key={mode}
              onClick={() => setChatMode(mode)}
              className={`flex-1 min-w-[200px] p-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] shadow-sm ${
                chatMode === mode
                  ? 'bg-[#A78BFA] dark:bg-[#C4B5FD] text-white dark:text-[#1E1B2E] shadow-lg transform scale-[1.02]'
                  : 'bg-white dark:bg-[#2C2542] text-[#2E2E2E] dark:text-[#EDE9FE] hover:bg-gray-50 dark:hover:bg-[#3A3154] border border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold mb-1">{label}</div>
                <div className="text-xs opacity-75">{desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-[#2C2542] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 h-[600px] flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    message.isUser
                      ? 'bg-[#EDE9FE] dark:bg-[#4C406D] text-[#1F1F1F] dark:text-[#F5F3FF] ml-4'
                      : 'bg-[#E0D7F8] dark:bg-[#635985] text-[#1F1F1F] dark:text-[#F5F3FF] mr-4'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {!message.isUser && (
                        <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#9333EA] dark:from-[#C4B5FD] dark:to-[#A78BFA] rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                          <span className="text-lg">🤖</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-base leading-relaxed font-medium">{message.text}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {message.isUser && (
                        <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#9333EA] dark:from-[#C4B5FD] dark:to-[#A78BFA] rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                          <span className="text-lg">😊</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[75%] mr-4">
                  <div className="p-4 rounded-2xl bg-[#E0D7F8] dark:bg-[#635985] text-[#1F1F1F] dark:text-[#F5F3FF] shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#A78BFA] to-[#9333EA] dark:from-[#C4B5FD] dark:to-[#A78BFA] rounded-full flex items-center justify-center shadow-md">
                        <span className="text-lg">🤖</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#A78BFA] dark:bg-[#C4B5FD] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#A78BFA] dark:bg-[#C4B5FD] rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-[#A78BFA] dark:bg-[#C4B5FD] rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-[#1E1B2E]">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#A78BFA] dark:focus:ring-[#C4B5FD] focus:border-transparent bg-[#FFFFFF] dark:bg-[#2C2542] text-[#2E2E2E] dark:text-[#EDE9FE] placeholder-gray-500 dark:placeholder-gray-400 text-base font-medium shadow-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-4 bg-[#A78BFA] hover:bg-[#9333EA] dark:bg-[#C4B5FD] dark:hover:bg-[#A78BFA] disabled:bg-gray-300 disabled:cursor-not-allowed text-white dark:text-[#1E1B2E] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BreathingModal isOpen={showBreathing} onClose={() => setShowBreathing(false)} />
    </div>
  );
};

export default ChatPage;