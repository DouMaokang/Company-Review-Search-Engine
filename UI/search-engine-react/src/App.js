import React, { useState , useEffect} from 'react';
import SearchBar from "./components/SearchBar";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import Histogram from "./components/Histogram";
import ReactWordcloud from 'react-wordcloud';
import ReactTable from "./components/ReactTable"

function App() {
  
  const [words, setWords] = useState([]);
  const [company, setCompany] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [histogramData, setHistogramData] = useState([])

  const options = {
    rotations: 0,
    rotationAngles: [0, 0],
  };

  function renderHistogram(){
    if (searchResults.length != 0) {
      const result = searchResults.reduce((r, {_source}) => {
        let employer = _source.company;
        if(!r[employer]) {
          r[employer] = {employer,review_count: 1}
        }
        else{
          r[employer].review_count++;
        }
        return r;
        
      }, {})
      console.log(result);
      let result_arr = Object.keys(result).map(e => {
        return result[e];
      });
      setHistogramData(result_arr);
    }
  }

  useEffect(() => {
    renderHistogram()
  }, [searchResults])

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
      <Histogram histogramData={histogramData}/>
      {render_wordcloud()}
      <input type="text" onChange={handleChange} />
      <button onClick={request_wordcloud}>
        Get WordCloud
      </button>
      {searchResults.map((row) => console.log(row))}
      <ReactTable searchResults={searchResults}/>
    </div>
  );
}

export default App;
