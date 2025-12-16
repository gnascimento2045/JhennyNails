import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [clientName, setClientName] = useState('');
  const [statusChecks, setStatusChecks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('statusChecks');
    if (stored) {
      setStatusChecks(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const newCheck = {
      id: Date.now().toString(),
      client_name: clientName,
      timestamp: new Date().toISOString(),
    };

    const updatedChecks = [...statusChecks, newCheck];
    setStatusChecks(updatedChecks);
    localStorage.setItem('statusChecks', JSON.stringify(updatedChecks));
    setClientName('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jhenny Nails - Status Check</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            required
          />
          <button type="submit">Check Status</button>
        </form>
        <h2>Status Checks</h2>
        <ul>
          {statusChecks.map((check) => (
            <li key={check.id}>
              {check.client_name} - {new Date(check.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;