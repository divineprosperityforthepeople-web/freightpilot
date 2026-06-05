'use client';

import { useState } from 'react';

const presetQuestions = [
  'Which loads were most profitable?',
  'What is my average fuel cost per mile?',
  'Which customers owe money?',
  'What expenses are increasing?',
  'How many loads did I run this month?',
  'What is my total revenue this year?',
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m your FreightPilot AI assistant. Ask me anything about your trucking business.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {
    const q = question || input;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer || data.response || 'I found some data related to your question. Check your dashboard for detailed reports.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="text-2xl lg:text-3xl font-bold text-primary">AI Assistant</h1><p className="text-gray-500 mt-1">Ask questions about your trucking business.</p></div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chat Area */}
        <div className="card flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="input-field flex-1"
              placeholder="Ask a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button onClick={() => handleSend()} disabled={loading} className="btn-primary px-4 py-2">Send</button>
          </div>
        </div>

        {/* Preset Questions */}
        <div className="card">
          <h2 className="text-lg font-bold text-primary mb-4">Try Asking</h2>
          <div className="space-y-3">
            {presetQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all text-sm text-gray-700 font-medium"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-gray-600">The AI assistant can answer questions about your loads, expenses, fuel costs, customers, and overall business performance. Try asking about specific time periods or comparing metrics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}