import { FiPaperclip, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function MessageWindow() {
  const [text, setText] = useState('');

  return (
    <motion.div
      className="p-4 border-t bg-white flex items-center gap-3"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {/* Attachment Icon */}
      <FiPaperclip className="text-gray-500" />

      {/* Input Field */}
      <input
        type="text"
        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Ask a question..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      {/* Send Button using ShadCN */}
      <Button size="sm" variant="default" className="rounded-full">
        <FiSend className="text-white" />
      </Button>
    </motion.div>
  );
}
