import { motion, AnimatePresence } from 'framer-motion';
import { BsRobot } from 'react-icons/bs';
import { FiSend, FiHelpCircle } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

export default function AIwindow({ addToComposer, isOpen, onClose }) {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('ai');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [tooltipVisibleId, setTooltipVisibleId] = useState(null);
  const containerRef = useRef(null);

  const suggestions = [
    { id: 1, question: 'How do I get a refund?', answer: 'To get a refund, please contact our support within 30 days of purchase with your order details.' },
    { id: 2, question: 'Where can I track my order?', answer: 'You can track your order status in the "Orders" section of your account dashboard.' },
    { id: 3, question: 'Can I update my shipping address?', answer: 'Yes, you can update your shipping address before the order ships by editing your order details.' },
  ];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const handleSend = (msg) => {
    if (!msg.trim()) return;
    setText('');
    setIsTyping(true);
    setTooltipVisibleId(null);

    const matched = suggestions.find(
      (s) => s.question.toLowerCase() === msg.trim().toLowerCase()
    );
    const botReply = matched
      ? matched.answer
      : "Sorry, I don't have an answer for that.";

    setMessages((msgs) => [
      ...msgs,
      { id: Date.now(), from: 'user', text: msg },
    ]);

    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 1,
          from: 'bot',
          text: botReply,
          questionId: matched ? matched.id : null,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const variants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 20 : -20,
      position: 'absolute',
      width: '100%',
    }),
    animate: {
      opacity: 1,
      x: 0,
      position: 'relative',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction < 0 ? 20 : -20,
      position: 'absolute',
      width: '100%',
      transition: { duration: 0.4, ease: 'easeIn' },
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setDirection(tab === 'ai' ? -1 : 1);
      setActiveTab(tab);
    }
  };

  const getQuestionText = (id) => {
    const q = suggestions.find((s) => s.id === id);
    return q ? q.question : '';
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* AI Side Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[22rem] max-w-full bg-white border-l shadow-lg flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:static md:flex`}
      >
        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {['ai', 'details'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 text-center py-3 font-semibold text-sm transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300'
              }`}
            >
              {tab === 'ai' ? 'AI Copilot' : 'Details'}
            </button>
          ))}
        </div>

        <div className="relative flex-1 bg-white min-h-0">
          <AnimatePresence initial={false} custom={direction}>
            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full"
              >
                <header className="p-4 border-b flex items-center gap-3 bg-white sticky top-0 z-10 shadow-sm">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                    <BsRobot size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm leading-tight">
                      Hi, I’m Fin AI Copilot
                    </div>
                    <div className="text-xs text-gray-500 leading-tight">
                      Your personal support assistant
                    </div>
                  </div>
                </header>

                <div
                  ref={containerRef}
                  className="flex-1 px-2 sm:px-4 overflow-y-auto space-y-2 my-3 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  style={{ minHeight: 0 }}
                >
                  {messages.length === 0 && !isTyping && (
                    <p className="text-gray-500 text-xs italic select-none pt-4">
                      Ask me anything about this conversation.
                    </p>
                  )}
                  <AnimatePresence initial={false}>
                    {messages.map(({ id, from, text, questionId }) => (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`max-w-xl px-4 py-2 rounded-lg border break-words whitespace-pre-wrap word-break break-all text-xs relative ${
                          from === 'user'
                            ? 'bg-blue-100 border-blue-300 ml-auto text-gray-900 shadow-sm'
                            : 'bg-white border-gray-300 text-gray-800 shadow-sm'
                        }`}
                      >
                        {text}

                        {from === 'bot' && questionId && (
                          <div className="absolute top-2 right-2 flex items-center space-x-1">
                            <button
                              onClick={() =>
                                setTooltipVisibleId(
                                  tooltipVisibleId === id ? null : id
                                )
                              }
                              aria-label="Show question"
                              className="text-gray-400 hover:text-gray-600 focus:outline-none"
                              type="button"
                            >
                              <FiHelpCircle size={14} />
                            </button>
                          </div>
                        )}

                        {tooltipVisibleId === id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-8 right-2 z-20 max-w-xs bg-gray-100 text-gray-900 text-xs p-2 rounded shadow-lg whitespace-normal"
                            onClick={() => setTooltipVisibleId(null)}
                          >
                            <strong>Question:</strong> {getQuestionText(questionId)}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-xl px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-800 ml-auto shadow-sm flex items-center gap-2"
                        style={{ width: '70px' }}
                      >
                        <TypingDots />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-2 sm:px-4 pb-2 space-y-1">
                  {suggestions.map(({ id, question }) => (
                    <button
                      key={question}
                      onClick={() => handleSend(question)}
                      className="w-full text-left text-xs text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md border border-gray-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                <div className="p-2 sm:p-3 border-t bg-gray-50">
                  <div className="flex items-center gap-2 rounded-full px-3 py-2 bg-white shadow-sm border border-gray-200">
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Ask something..."
                      className="flex-1 text-xs focus:outline-none placeholder-gray-400 text-gray-900 bg-transparent"
                      onKeyDown={(e) => e.key === 'Enter' && handleSend(text)}
                    />
                    <button
                      disabled={!text.trim()}
                      className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors"
                      onClick={() => handleSend(text)}
                      aria-label="Send message"
                    >
                      <FiSend size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-6 text-gray-600 text-sm flex-1 flex items-center justify-center select-none"
              >
                Details content goes here...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-20 sm:bottom-16 left-0 right-0 px-2 sm:px-4">
          {(() => {
            const lastBotMessage = [...messages].reverse().find((m) => m.from === 'bot');
            if (!lastBotMessage) return null;
            return (
              <div className="flex justify-center">
                <button
                  onClick={() => addToComposer(lastBotMessage.text)}
                  className="text-blue-600 hover:text-blue-700 text-xs px-3 py-1 border border-blue-600 rounded-full shadow-sm bg-white"
                  aria-label="Add to composer"
                >
                  Add to Composer
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}

// Typing dots animation component
function TypingDots() {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{
            opacity: [0.3, 1, 0.3],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
