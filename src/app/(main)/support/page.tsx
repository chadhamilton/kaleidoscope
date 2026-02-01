'use client';

import { useState, useRef, useEffect, useId } from 'react';
import {
  Send,
  User,
  Bot,
  Phone,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Kaleidoscope assistant. I can help you with product information, order status, design recommendations, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(1);

  const quickReplies = [
    'Track my order',
    'Product recommendations',
    'Pricing information',
    'Schedule a consultation',
  ];

  const faqs: FAQ[] = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by visiting the Orders page in your dashboard. Each order shows real-time tracking information including carrier details and estimated delivery dates.',
    },
    {
      question: 'What is the return policy?',
      answer: 'We offer a 30-day return policy for most items. Custom orders and final sale items may have different terms. Contact our support team for specific product return information.',
    },
    {
      question: 'How does the design consultation work?',
      answer: 'Our design consultation process begins with a space assessment. A Kaleidoscope designer will review your needs, create design concepts, and provide a detailed proposal with furniture recommendations tailored to your space.',
    },
    {
      question: 'Do you offer installation services?',
      answer: 'Yes! We provide professional installation services for all furniture purchases. Installation is typically scheduled within 2 weeks of delivery and is performed by our certified installation team.',
    },
    {
      question: 'What are the lead times for furniture?',
      answer: 'Lead times vary by product and manufacturer. Most in-stock items ship within 1-2 weeks. Custom orders typically require 4-8 weeks. You can find specific lead times on each product page.',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('track') || lowerMessage.includes('order')) {
      return "I can help you track your orders! You currently have 2 active orders. Your order ORD-2025-0142 is in transit and expected to arrive by February 15th. Would you like me to provide more details or direct you to the Orders page?";
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
      return "I'd be happy to help with recommendations! Based on your recent projects, I'd suggest looking at our ergonomic seating collection - the Herman Miller Aeron and Steelcase Gesture chairs are client favorites. What type of furniture are you looking for?";
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "For detailed pricing information, I recommend using our Budget Estimator tool. You can add products, adjust quantities, and get an estimated total including shipping and installation. Would you like me to walk you through creating an estimate?";
    }

    if (lowerMessage.includes('schedule') || lowerMessage.includes('consultation') || lowerMessage.includes('meeting')) {
      return "Great! I can help you schedule a consultation with our design team. They're available Monday through Friday, 9 AM to 5 PM EST. What time works best for you, and what would you like to discuss?";
    }

    if (lowerMessage.includes('human') || lowerMessage.includes('person') || lowerMessage.includes('agent')) {
      return "I understand you'd like to speak with someone from our team. I'm connecting you with a Kaleidoscope design specialist. Someone will join this chat shortly. In the meantime, is there anything else I can help you with?";
    }

    return "I'm here to help! I can assist you with order tracking, product recommendations, pricing information, or scheduling a consultation. What would you like to know more about?";
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: String(++messageIdCounter.current),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const assistantMessage: Message = {
      id: String(++messageIdCounter.current),
      role: 'assistant',
      content: generateResponse(content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-kc-slate">
          Support
        </h1>
        <p className="text-kc-steel mt-1">
          Get help from our AI assistant or connect with our design team.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="card flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="p-4 border-b border-kc-cloud flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-kc-slate to-kc-steel rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-kc-slate">Kaleidoscope Assistant</h3>
                  <p className="text-xs text-kc-success flex items-center gap-1">
                    <span className="w-2 h-2 bg-kc-success rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>
              <button className="btn-secondary text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Talk to Human
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-kc-slate text-white'
                        : 'bg-kc-pearl text-kc-slate'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-kc-slate text-white rounded-br-none'
                        : 'bg-kc-pearl text-kc-slate rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-white/60' : 'text-kc-mist'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-kc-pearl flex items-center justify-center">
                    <Bot className="w-4 h-4 text-kc-slate" />
                  </div>
                  <div className="bg-kc-pearl p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-kc-mist rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-kc-mist rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-kc-mist rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="px-3 py-1.5 text-sm bg-kc-pearl text-kc-steel rounded-full hover:bg-kc-cloud transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-kc-cloud">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="input flex-1"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-1">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-kc-steel" />
              <h2 className="font-heading font-semibold text-kc-slate">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-kc-cloud rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-3 hover:bg-kc-pearl/50 transition-colors text-left"
                  >
                    <span className="text-sm font-medium text-kc-slate pr-2">
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-4 h-4 text-kc-mist flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-kc-mist flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-3 pb-3">
                      <p className="text-sm text-kc-steel">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="card p-5 mt-4">
            <h3 className="font-medium text-kc-slate mb-3">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-kc-mist">Email</p>
                <p className="text-kc-slate">support@kaleidoscopeconcepts.com</p>
              </div>
              <div>
                <p className="text-kc-mist">Phone</p>
                <p className="text-kc-slate">1-800-555-0123</p>
              </div>
              <div>
                <p className="text-kc-mist">Hours</p>
                <p className="text-kc-slate">Mon-Fri, 9 AM - 5 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
