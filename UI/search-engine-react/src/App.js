import SearchBar from "./components/SearchBar";
import Histogram from "./components/Histogram";
import React from "react";
import ReactWordcloud from 'react-wordcloud';

function App() {
  const words = [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
  ]
  
  return (
    <div>
      <SearchBar />
      <Histogram />
      <ReactWordcloud words={words} />
    </div>
  );
}

export default App;
