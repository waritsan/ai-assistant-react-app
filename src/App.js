
import React, { useState } from 'react';
import './App.css';
import ChatPage from './ChatPage';

const newsFeed = [
  {
    id: 1,
    title: 'Breaking News: React 19 Released!',
    summary: 'React 19 brings new features and performance improvements for developers.',
    image: 'https://source.unsplash.com/random/400x200?tech',
  },
  {
    id: 2,
    title: 'Mobile-First Design Best Practices',
    summary: 'Learn how to design responsive, mobile-first web applications.',
    image: 'https://source.unsplash.com/random/400x200?mobile',
  },
  {
    id: 3,
    title: 'JavaScript Trends in 2025',
    summary: 'Discover the latest trends in JavaScript and web development.',
    image: 'https://source.unsplash.com/random/400x200?javascript',
  },
];

function App() {
  const [page, setPage] = useState('main');
  // Format date as: Wednesday, August 6, 2025
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="mobile-app-container">
      {page === 'main' && (
        <>
          <div className="top-header">
            <div className="header-info">
              <div className="header-date">{dateString}</div>
              <div className="header-greeting">Hello Warit</div>
            </div>
            <div className="header-avatar">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" />
            </div>
          </div>
          <header className="search-bar">
            <input type="text" placeholder="Search news..." />
          </header>
          <main className="news-feed">
            {newsFeed.map((news) => (
              <div className="news-card" key={news.id}>
                <img src={news.image} alt={news.title} className="news-image" />
                <div className="news-content">
                  <h2>{news.title}</h2>
                  <p>{news.summary}</p>
                </div>
              </div>
            ))}
          </main>
        </>
      )}
      {page === 'chat' && <ChatPage />}
      <nav className="toolbar">
        <button className="toolbar-btn" aria-label="Home" onClick={() => setPage('main')}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
          <span>Home</span>
        </button>
        <button className="toolbar-btn" aria-label="Chat" onClick={() => setPage('chat')}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Chat</span>
        </button>
        <button className="toolbar-btn" aria-label="Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
          <span>Menu</span>
        </button>
      </nav>
      <div className="background-gradient"></div>
    </div>
  );
}

export default App;
