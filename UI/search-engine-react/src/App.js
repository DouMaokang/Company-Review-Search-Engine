import React, { useState, useEffect } from 'react';
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
  const [pieChartData, setPieChartData] = useState({
    labels: [
      'positive',
      'negative',
      'neutral'
    ],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });
  const [lineChartData, setLineChartData] = useState({
    datasets: [
      {
        label: 'review trend',
        data: [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  })

  const options = {
    rotations: 0,
    rotationAngles: [0, 0],
  };

  function handleChangeCompany(e) {
    setCompany(e.target.value)
  }

  useEffect(() => {
    getSemanticAnalysisData()
    render_bar_chart()
  }, [searchResults]) 

  function getPositiveness() {
    const classification = ['positive', 'negative', 'neutral']
    const randomElement = classification[Math.floor(Math.random() * classification.length)];
    return randomElement
  }

  function getSemanticAnalysisData() {
    const positiveness = []
    var counts = {'positive': 0, 'negative': 0, 'neutral': 0};

    for (var i=0; i<searchResults.length; i++) {
      let randomElement = getPositiveness()
      positiveness.push(randomElement)
    }
    
    positiveness.forEach(function(x) { counts[x] = counts[x]+1 });
    setPieChartData({...pieChartData, datasets: [
      {
        data: [counts['positive'], counts['negative'], counts['neutral']],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ]})
  }

  function render_bar_chart() {
    if (searchResults.length != 0) {
      const result = searchResults.reduce((r, {_source}) => {
        let dateObj = new Date(_source.date);
        let monthyear = dateObj.toLocaleString("fr-ca", { month: "numeric", year: 'numeric' });
        let randomElement = getPositiveness()
        if(!r[monthyear] && randomElement === "positive") {
          r[monthyear] = {monthyear, positive_count: 1, negative_count: 0, neutral_count: 0}
        }
        else if (!r[monthyear] && randomElement === "negative") {
          r[monthyear] = {monthyear, positive_count: 0, negative_count: 1, neutral_count: 0}
        }
        else if (!r[monthyear] && randomElement === "neutral") {
          r[monthyear] = {monthyear, positive_count: 0, negative_count: 0, neutral_count: 1}
        }
        else if (randomElement === "positive") r[monthyear].positive_count++;
        else if (randomElement === "negative") r[monthyear].negative_count++;
        else if (randomElement === "neutral") r[monthyear].neutral_count++;
        return r;
      }, {})
      
      let result_arr = Object.keys(result).map(e => {
        return result[e];
      });
      result_arr.sort(function (a, b) {
        return a.monthyear.localeCompare(b.monthyear);
      });
      console.log(result_arr)
      setLineChartData({...lineChartData, datasets: [
        {
          label: 'positive count',
          data: result_arr.map(o => ({ x: o.monthyear, y: o.positive_count })),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: 'negative count',
          data: result_arr.map(o => ({ x: o.monthyear, y: o.negative_count })),
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: "#742774",
        },
        {
          label: 'neutral count',
          data: result_arr.map(o => ({ x: o.monthyear, y: o.neutral_count })),
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
        }
      ]})
    }
  }

  function request_wordcloud(e) {
    setWords([])
    const headers =[]
    e.preventDefault();
    if (company.length != 0) {
      fetch(`http://localhost:8000/wordcloud/?company=${company}`, {
        method: 'GET'})
        .then(response => response.json())
        .then(data => {
          setWords(data)
        })
    }
  }

  function reqeust_search_result_by_company(e, query, company) {
    e.preventDefault();
    fetch(`http://localhost:8000/search_by_company/?company=${company}&query=${query}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function request_search_result(e, query) {
    e.preventDefault();
    
    fetch(`http://localhost:8000/search/?query=${query}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function render_wordcloud() {
    return (<div style={{ height: 400, width: 600 }}>
      <ReactWordcloud words={words} options={options}/>
    </div>)
  }

  return (
    <div>
      <SearchBar search={request_search_result} />
      <p>Search by company</p>
      <input type="text" onChange={handleChangeCompany} />
      <button onClick={e => reqeust_search_result_by_company(e, '', company)}>
        Go
      </button>
      {searchResults.length !== 0 && <PieChart pieChartData={pieChartData} />}
      {searchResults.length !== 0 && <LineChart lineChartData={lineChartData} />}
      <Histogram />
      {words.length !== 0 && render_wordcloud()}
      <input type="text" onChange={handleChangeCompany} />
      <button onClick={request_wordcloud}>
        Get WordCloud
      </button>
      <ReactTable searchResults={searchResults}/>
    </div>
  );
}

export default App;
