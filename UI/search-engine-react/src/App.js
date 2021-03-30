import React, { useState } from 'react';
import SearchBar from "./components/SearchBar";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import Histogram from "./components/Histogram";
import ReactWordcloud from 'react-wordcloud';

function App() {
  
  const [words, setWords] = useState([]);
  const [company, setCompany] = useState('');
  const [searchResults, setSearchResults] = useState([])

  const options = {
    rotations: 0,
    rotationAngles: [0, 0],
  };

  function handleChange(e) {
    setCompany(e.target.value)
  }

  function request_wordcloud(e) {
    setWords([])
    const headers =[]
    e.preventDefault();
    fetch(`http://localhost:8000/wordcloud/?company=${company}`, {
      method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setWords(old => [...old, ...data])
      })
  }

  function request_search_result(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/search/?query=wrk`, {
      method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setSearchResults(old => [...old, ...data.hits.hits])
      })
      .then(data => console.log(searchResults))
  }

  function render_wordcloud() {
    return (<div style={{ height: 400, width: 600 }}>
      <ReactWordcloud words={words} options={options}/>
    </div>)
  }

  return (
    <div>
      <SearchBar search={request_search_result} />
      <PieChart />
      <LineChart />
      <Histogram />
      {render_wordcloud()}
      <input type="text" onChange={handleChange} />
      <button onClick={request_wordcloud}>
        Get WordCloud
      </button>
    </div>
  );
}

export default App;
