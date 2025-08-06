
import React, { useState } from 'react';
import './App.css';
import ChatPage from './ChatPage';

const newsFeed = [
  {
    id: 1,
    title: 'โครงการสินเชื่อที่อยู่อาศัยฯ',
    summary: 'ปัจจุบันโครงการสินเชื่อที่อยู่อาศัยฯ ธนาคารอยู่ระหว่างการพิจารณาอนุมัติสินเชื่อ ทั้งนี้ หากคิวที่อยู่ระหว่างการพิจารณาไม่ผ่านการอนุมัติของธนาคาร สำนักงานประกันสังคมจะเรียกคิวสำรองเพิ่มเติมในระยะถัดไป',
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'โครงการสินเชื่อเพื่อส่งเสริมการจ้างงาน',
    summary: 'สถานประกอบการที่สนใจเข้าร่วมโครงการสินเชื่อเพื่อส่งเสริมการจ้างงาน ระยะที่ 3 (พ.ศ. 2568 – 2569) สามารถขอรับหนังสือรับรองเพื่อประกอบการขอสินเชื่อ ได้ตั้งแต่วันที่ 3 กรกฎาคม 2568 เป็นต้นไป',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'โครงการสินเชื่อที่อยู่อาศัยเพื่อผู้ประกันตน',
    summary: 'ประกาศเรียกคิวสำรองโครงการสินเชื่อที่อยู่อาศัยเพื่อผู้ประกันตน พ.ศ. 2567 รอบวันที่ 16 มิถุนายน 2568',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
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
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=facearea&w=200&h=200&facepad=3" alt="kid avatar" />
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
