import React, { useState } from 'react';
import './App.css';

const suggestedPrompts = [
  'What is the latest news in technology?',
  'Explain quantum computing in simple terms.',
  'How can I improve my productivity?',
  'Tell me a fun fact about space.',
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(false);
  // Removed unused error state

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://ai-assistant-function.azurewebsites.net/api/openai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      // Extract assistant message(s) and join their text values
      let assistantTexts = [];
      if (Array.isArray(data.messages)) {
        data.messages.forEach(msg => {
          if (msg.role === 'assistant' && Array.isArray(msg.content)) {
            msg.content.forEach(part => {
              if (part.type === 'text' && part.text && part.text.value) {
                assistantTexts.push(part.text.value);
              }
            });
          }
        });
      }
      const reply = assistantTexts.length > 0 ? assistantTexts.join('\n\n') : 'No response from assistant.';
      setMessages(msgs => [...msgs, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Sorry, there was a problem connecting to the assistant.' }]);
      setError('Failed to connect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatgpt-page">
      <div className="chatgpt-header">Chat
        <span className="chatgpt-header-sub">AI Assistant</span>
      </div>
      <div className="chatgpt-suggestions">
        {suggestedPrompts.map((prompt, i) => (
          <button key={i} className="chatgpt-suggestion" onClick={() => handleSend(prompt)}>{prompt}</button>
        ))}
      </div>
      <div className="chatgpt-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chatgpt-msg chatgpt-msg-${msg.role}`}>{msg.content}</div>
        ))}
        {loading && (
          <div className="chatgpt-msg chatgpt-msg-assistant">...
            <span style={{ color: '#a78bfa', fontStyle: 'italic', fontSize: '0.97rem' }}>Assistant is typing...</span>
          </div>
        )}
      </div>
      <form className="chatgpt-inputbar" onSubmit={e => { e.preventDefault(); handleSend(input); }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
      <nav className="toolbar chatgpt-toolbar">
        <button className="toolbar-btn" aria-label="Home" onClick={() => window.location.reload()}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>
          <span>Home</span>
        </button>
        <button className="toolbar-btn active" aria-label="Chat">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Chat</span>
        </button>
        <button className="toolbar-btn" aria-label="Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="12" r="2"/></svg>
          <span>Menu</span>
        </button>
      </nav>
    </div>
  );
}
