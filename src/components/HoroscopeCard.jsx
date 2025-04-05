import React from 'react';

const HoroscopeCard = ({ content }) => {
  const copyText = () => {
    navigator.clipboard.writeText(content);
    alert('রাশিফল কপি করা হয়েছে ✅');
  };

  const downloadText = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rashifal.txt';
    link.click();
  };

  return (
    <div className="card">
      <pre>{content}</pre>
      <button onClick={copyText}>📋 কপি</button>
      <button onClick={downloadText}>⬇️ ডাউনলোড</button>
    </div>
  );
};

export default HoroscopeCard;
