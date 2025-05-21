import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AIwindow from './components/AIwindow';
import { useState } from 'react';
import { BsRobot } from 'react-icons/bs';

function App() {
  const [text, setText] = useState('');
  const [aiOpen, setAiOpen] = useState(false);
  const [askText, setAskText] = useState('');
// initial state of opened conversation
  const [selectedConversation, setSelectedConversation] = useState({
    id: 1,
    name: 'Luis · GitHub',
    snippet: 'Hey! I have a question about the repo...',
    time: '45m',
    unread: true,
    archived: false,
    open: true,
    waitingSinceMinutes: 120,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  });

  const addToComposer = (newText) => {
    console.log(newText);
    setText(newText);
  };

  return (
    <div className="flex h-screen relative">
      <Sidebar onSelectConversation={setSelectedConversation} />

      {/* Chat content */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            text={text}
            setText={setText}
            setAskText={setAskText}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>

      {/* AI Assistant Panel */}
      <AIwindow isOpen={aiOpen} onClose={() => setAiOpen(false)} addToComposer={addToComposer} askText={askText} />

      {/* Floating Button on Mobile */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
        onClick={() => setAiOpen(prev => !prev)}
        aria-label="Open AI Assistant"
      >
        <BsRobot size={20} />
      </button>
    </div>
  );
}

export default App;
