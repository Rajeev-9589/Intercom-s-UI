import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function AIwindow() {
  return (
    <div className="w-80 border-l bg-white flex flex-col">
      {/* Header */}
      <header className="p-6 font-semibold text-lg border-b">Hi, I’m Fin AI Copilot</header>

      {/* Body */}
      <div className="flex-1 p-6 text-gray-600">
        Ask me anything about this conversation.
      </div>

      {/* Suggested Action */}
      <div className="p-4 border-t">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="ghost" className="w-full justify-start">
            How do I get a refund?
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
