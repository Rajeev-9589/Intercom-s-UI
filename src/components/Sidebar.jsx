import { FiMail } from 'react-icons/fi';

const conversations = [
  { id: 1, name: 'Luis · GitHub', snippet: 'Hey! I have a questio...', time: '45m', unread: true },
  { id: 2, name: 'Ivan · Nike', snippet: 'Hi there, I have a qu...', time: '30m', unread: false },
  { id: 3, name: 'Lead from New York', snippet: 'Good morning, let me...', time: '40m', unread: true },
];

export default function Sidebar() {
  return (
    <div className="w-80 border-r bg-white flex flex-col">
      <header className="p-4 font-bold text-lg border-b">Your inbox</header>
      <ul className="flex-1 overflow-y-auto divide-y">
        {conversations.map(conv => (
          <li
            key={conv.id}
            className={`px-4 py-3 flex justify-between items-start gap-2 ${
              conv.unread ? 'bg-blue-50' : 'hover:bg-gray-100'
            }`}
          >
            <div>
              <div className="font-medium">{conv.name}</div>
              <div className="text-sm text-gray-600 truncate w-48">{conv.snippet}</div>
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">{conv.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
