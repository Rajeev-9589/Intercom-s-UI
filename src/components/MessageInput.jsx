import { useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function MessageInput({ text, setText, onSend }) {
  const [isFocused, setIsFocused] = useState(false);

  const sendMessage = () => {
    if (!text.trim()) return;
    const message = {
      from: 'agent',
      text: text.trim(),
    };
    onSend(message);
    setText('');
  };

 return (
    <motion.div
      layout
      className="border-t bg-white p-3"
      animate={{ height: isFocused ? '72px' : '96px' }}
      transition={{ duration: 0.25 }}
    >
      <div
        className={`flex items-center justify-between border border-gray-300 shadow-sm bg-white px-4 rounded-lg ${
          isFocused ? 'py-1' : 'py-3'
        }`}
      >
        <button
          className="flex items-center gap-1 text-sm text-gray-700 font-medium"
          type="button"
        >
          Chat
          <ChevronDown className="w-4 h-4" />
        </button>

        <input
          type="text"
          className="flex-1 mx-3 h-12 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none min-w-0"
          placeholder="Send a message..."
          value={text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />

        <div className="flex items-center gap-2 text-gray-500">
          <button type="button" aria-label="Insert emoji">
            <BsEmojiSmile size={18} />
          </button>
          <button type="button" aria-label="Attach file">
            <FiPaperclip size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}