import { useState, useEffect } from 'react';
import { FiMail, FiMenu } from 'react-icons/fi';

const conversations = [
  {
    id: 1,
    name: 'Luis · GitHub',
    snippet: 'Hey! I have a question about the repo...',
    time: '45m',
    unread: true,
    archived: false,
    open: true,
    waitingSinceMinutes: 120,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Ivan · Nike',
    snippet: 'Hi there, I have a quick question...',
    time: '30m',
    unread: false,
    archived: false,
    open: true,
    waitingSinceMinutes: 15,
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    id: 3,
    name: 'Lead from New York',
    snippet: 'Good morning, let me know your availability...',
    time: '40m',
    unread: true,
    archived: false,
    open: false,
    waitingSinceMinutes: 300,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    name: 'Emma · Spotify',
    snippet: 'Thanks for your help yesterday!',
    time: '10m',
    unread: false,
    archived: false,
    open: true,
    waitingSinceMinutes: 60,
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 5,
    name: 'Raj · Google',
    snippet: 'Can you check the report I sent?',
    time: '5h',
    unread: true,
    archived: false,
    open: true,
    waitingSinceMinutes: 200,
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    id: 6,
    name: 'Sophia · Amazon',
    snippet: 'Is the shipment on track?',
    time: '1d',
    unread: false,
    archived: false,
    open: false,
    waitingSinceMinutes: 400,
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: 7,
    name: 'Alex · Tesla',
    snippet: 'Please update me on the new project.',
    time: '3h',
    unread: true,
    archived: false,
    open: true,
    waitingSinceMinutes: 180,
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 8,
    name: 'Maya · Netflix',
    snippet: 'Loved the last feature update!',
    time: '2d',
    unread: false,
    archived: false,
    open: false,
    waitingSinceMinutes: 500,
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
];

const FILTERS = [
  {
    id: 'waitingLongest',
    label: 'Waiting longest',
    filterFn: (conv) => conv.open && !conv.archived,
    sortFn: (a, b) => b.waitingSinceMinutes - a.waitingSinceMinutes,
  },
  {
    id: 'open',
    label: 'Open',
    filterFn: (conv) => conv.open && !conv.archived,
  },
];

export default function Sidebar({ onSelectConversation }) {
  const [activeFilter, setActiveFilter] = useState('waitingLongest');
  const [isOpen, setIsOpen] = useState(false); // Sidebar starts closed on mobile

  const activeFilterObj = FILTERS.find((f) => f.id === activeFilter);
  let filteredConversations = conversations.filter(activeFilterObj.filterFn);

  if (activeFilterObj.sortFn) {
    filteredConversations = filteredConversations.slice().sort(activeFilterObj.sortFn);
  }

  const getCount = (filter) => conversations.filter(filter.filterFn).length;

  // Lock background scroll when sidebar is open (on mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleSelect = (conv) => {
    onSelectConversation(conv);
    // Auto-close sidebar on mobile after selecting conversation
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 z-30 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        <FiMenu size={24} />
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 flex flex-col z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="font-semibold text-sm whitespace-nowrap">Your inbox</h1>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-1 whitespace-nowrap px-2 py-1 text-xs font-semibold rounded-full focus:outline-none ${activeFilter === filter.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
                <span className="inline-block min-w-[18px] px-1 text-xs font-semibold text-center rounded-full bg-gray-300 text-gray-700">
                  {getCount(filter)}
                </span>
              </button>
            ))}
          </div>
        </header>

        <ul className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <li className="p-4 text-center text-gray-500">No conversations</li>
          ) : (
            filteredConversations.map((conv) => (
              <li
                key={conv.id}
                onClick={() => handleSelect(conv)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${conv.unread ? 'bg-blue-50' : 'hover:bg-gray-100'
                  }`}
              >
                <div
                  className={`flex items-center justify-center rounded-full w-10 h-10 shrink-0 overflow-hidden
                    ${conv.unread ? 'ring-2 ring-blue-400' : 'bg-gray-300'}`}
                >
                  {conv.avatar ? (
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <FiMail size={20} className={conv.unread ? 'text-blue-400' : 'text-gray-700'} />
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className={`font-medium text-gray-900 truncate ${conv.unread ? 'font-semibold' : 'font-normal'}`}>
                    {conv.name}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{conv.snippet}</div>
                </div>

                <div className="text-xs text-gray-500 whitespace-nowrap">{conv.time}</div>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
  );
}
