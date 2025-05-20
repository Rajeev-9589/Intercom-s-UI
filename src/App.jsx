import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AIwindow from './components/AIwindow';

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
      <AIwindow />
    </div>
  );
}

export default App;
