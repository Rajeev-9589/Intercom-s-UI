import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MessageInput from './MessageInput';
import { Button } from './ui/button';
import { Moon,  X } from "lucide-react";
export default function ChatWindow({ conversation, text, setText, setAskText }) {
  const askRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      from: 'customer',
      text: 'Hi, I bought a product as a Christmas gift, but the recipient already has it. Can I get a refund?',
    },
  ]);
  const [selectedText, setSelectedText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        askRef.current &&
        !askRef.current.contains(event.target)
      ) {
        // Only clear if there's no selected text anymore
        if (!window.getSelection().toString().trim()) {
          setSelectedText('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);

    const lower = msg.text.toLowerCase();

    setTimeout(() => {

      if (lower.includes('please contact our support') || lower.includes('exception')) {
        setMessages((prev) => [
          ...prev,
          {
            from: 'customer',
            text: 'I placed the order over 60 days ago. Could you make an exception please?',
          },
          {
            from: 'agent',
            text: 'Unfortunately, refunds are not available after 30 days. I’ll escalate this to our supervisor.',
          },
        ]);
      } else if (lower.includes('track')) {
        setMessages((prev) => [
          ...prev,
          {
            from: 'agent',
            text: 'You can track your order status in the "Orders" section of your account dashboard.',
          },
        ]);
      } else if (lower.includes('address')) {
        setMessages((prev) => [
          ...prev,
          {
            from: 'agent',
            text: 'Yes, you can update your shipping address before the order ships by editing your order details.',
          },
        ]);
      }
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 border rounded-xl shadow-sm relative max-w-full md:max-w-none">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-900 truncate max-w-xs">
              {conversation.name}
            </span>
            <span className="text-xs text-green-500">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>

            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20"
              >
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => { alert('Marked as unread'); setMenuOpen(false); }}>
                  Mark as unread
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => { alert('Archived'); setMenuOpen(false); }}>
                  Archive
                </button>
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100" onClick={() => { alert('Deleted'); setMenuOpen(false); }}>
                  Delete
                </button>
              </motion.div>
            )}
          </div>

          <Button variant="ghost" size="icon" className="rounded-full">
            <Moon className="h-4 w-4" />
          </Button>

  
          <Button className="bg-black text-white hover:bg-black/80 h-8 px-3 text-sm rounded-full">
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

      </header>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 text-sm text-gray-800">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`relative whitespace-pre-line select-text max-w-xs sm:max-w-md md:max-w-lg px-4 py-2 rounded-lg shadow-sm border text-sm ${msg.from === 'agent'
              ? 'ml-auto bg-white border-gray-200'
              : 'ml-0 bg-blue-100 text-blue-900 border-blue-200'
              }`}
            onMouseUp={() => {
              const selection = window.getSelection().toString().trim();
              if (selection) setSelectedText(selection);
              else setSelectedText('');
            }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Ask Fin Copilot button */}
      {selectedText && (
        <div
          ref={askRef}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border shadow-md px-4 py-2 rounded-full flex items-center gap-2"
          >
            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {selectedText}
            </span>
            <button
              onClick={() => {
                setAskText(selectedText);
              }}
              className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-700"
            >
              Ask Fin Copilot
            </button>
          </motion.div>
        </div>
      )}

      <MessageInput text={text} setText={setText} onSend={addMessage} />
    </div>
  );
}
