import React, { useState, useEffect } from 'react';
import HoroscopeCard from './components/HoroscopeCard';
import './styles.css';

const rashis = [
  { name: 'মেষ', key: 'mesh' },
  { name: 'বৃষ', key: 'brish' },
  { name: 'মিথুন', key: 'mithun' },
  { name: 'কর্কট', key: 'karkat' },
  { name: 'সিংহ', key: 'singha' },
  { name: 'কন্যা', key: 'konna' },
  { name: 'তুলা', key: 'tula' },
  { name: 'বৃশ্চিক', key: 'brischik' },
  { name: 'ধনু', key: 'dhonu' },
  { name: 'মকর', key: 'mokor' },
  { name: 'কুম্ভ', key: 'kumbh' },
  { name: 'মীন', key: 'meen' }
];

const App = () => {
  const [selectedRashi, setSelectedRashi] = useState('');
  const [selectedDay, setSelectedDay] = useState('আজ');
  const [content, setContent] = useState('');
  const [rashifalData, setRashifalData] = useState({});

  useEffect(() => {
    fetch('/rashi.json')
      .then(res => res.json())
      .then(data => setRashifalData(data));
  }, []);

  const generateContent = () => {
    const selected = rashis.find(r => r.name === selectedRashi);
    if (selected && rashifalData[selected.key]) {
      setContent(`🔯 ${selectedRashi} রাশির জন্য ${selectedDay} এর রাশিফল:\n\n${rashifalData[selected.key].content}`);
    } else {
      setContent('দুঃখিত, রাশিফল এখন পাওয়া যাচ্ছে না।');
    }
  };

  return (
    <div className="app-container">
      <h1>🔱 জ্যোতিষ কনটেন্ট জেনারেটর</h1>

      <select onChange={e => setSelectedRashi(e.target.value)}>
        <option value="">-- রাশি নির্বাচন করুন --</option>
        {rashis.map(r => <option key={r.key}>{r.name}</option>)}
      </select>

      <select onChange={e => setSelectedDay(e.target.value)}>
        <option value="আজ">আজ</option>
        <option value="আগামীকাল">আগামীকাল</option>
        <option value="সপ্তাহ">সাপ্তাহিক</option>
        <option value="মাস">মাসিক</option>
      </select>

      <button onClick={generateContent}>রাশিফল দেখুন</button>

      {content && <HoroscopeCard content={content} />}
    </div>
  );
};

export default App;
