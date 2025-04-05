useEffect(() => {
  fetch('/rashi.json')
    .then(res => res.json())
    .then(data => setHoroscope(data));
}, []);


import React, { useState } from 'react';
import HoroscopeCard from './components/HoroscopeCard';
import './styles.css';

const rashis = [
  'মেষ', 'বৃষ', 'মিথুন', 'কর্কট', 'সিংহ', 'কন্যা',
  'তুলা', 'বৃশ্চিক', 'ধনু', 'মকর', 'কুম্ভ', 'মীন'
];

const days = ['আজ', 'আগামীকাল', 'সপ্তাহ', 'মাস'];

const App = () => {
  const [selectedRashi, setSelectedRashi] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [content, setContent] = useState('');

  const generateContent = () => {
    setContent(`🔯 ${selectedRashi} রাশির জন্য ${selectedDay} এর রাশিফল:\nআজ আপনার ভাগ্যে নতুন কিছু আসতে চলেছে। সতর্ক থাকুন, আত্মবিশ্বাস বজায় রাখুন। শুভ দিন হোক! 🪔`);
  };

  return (
    <div className="app-container">
      <h1>🔱 জ্যোতিষ কনটেন্ট জেনারেটর</h1>

      <select onChange={e => setSelectedRashi(e.target.value)}>
        <option value="">-- রাশি নির্বাচন করুন --</option>
        {rashis.map(r => <option key={r}>{r}</option>)}
      </select>

      <select onChange={e => setSelectedDay(e.target.value)}>
        <option value="">-- দিন নির্বাচন করুন --</option>
        {days.map(d => <option key={d}>{d}</option>)}
      </select>

      <button onClick={generateContent}>রাশিফল দেখুন</button>

      {content && <HoroscopeCard content={content} />}
    </div>
  );
};

export default App;
