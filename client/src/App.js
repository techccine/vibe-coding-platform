import React, { useState } from 'react';
import './index.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    const res = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResult(data.html || 'Something went wrong.');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vibe Coding - Instant UI Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Describe what you want..."
        className="border p-2 rounded w-full mb-4"
      />
      <button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 rounded">Generate</button>
      <div className="mt-6 border p-4">
        <h2 className="font-bold mb-2">Generated Code:</h2>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default App;