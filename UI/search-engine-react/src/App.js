import React, { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import Histogram from "./components/Histogram";
import ReactWordcloud from 'react-wordcloud';
import ReactTable from "./components/ReactTable"

function App() {
  const [words, setWords] = useState([]);
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [company_category, setCompanyCategory] = useState('');
  const [status, setStatus] = useState('Current Employee');
  const [company_for_status, setCompanyForStatus] = useState('');
  const [company_query, setCompanyQuery] = useState('')
  const [location_query, setLocationQuery] = useState('')
  const [company_category_query, setCompanyCategoryQuery] = useState('')
  const [status_query, setStatusQuery] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [totalReviews, setTotalReviews] = useState(0)
  const [loadText, setLoadText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [histogramData, setHistogramData] = useState([])
  const [pieChartData, setPieChartData] = useState({
    labels: [
      'Positive',
      'Negative',
      'Neutral'
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

  function clear_query(e) {
    setCompany('')
    setLocation('')
    setCompanyCategory('')
    setCompanyQuery('')
    setLocationQuery('')
    setCompanyCategory('')
    setCompanyForStatus('')
  }

  // function handleChangeCompany(e) {
  //   setCompany(e.target.value)
  // }

  // function handleChangeLocation(e) {
  //   setLocation(e.target.value)
  // }

  function renderHistogram(){
    if (searchResults.length !== 0) {
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
      let result_arr = Object.keys(result).map(e => {
        return result[e];
      });
      result_arr.sort(function (a, b) {
        return b.review_count - a.review_count;
      });
      setHistogramData(result_arr.slice(0, 5));
    }
  }

  function getSemanticAnalysisData() {
    if (searchResults.length !== 0) {
      var counts = {'Positive': 0, 'Negative': 0, 'Neutral': 0};
      let positiveness = searchResults.map(item => item._source.sentiment)
      
      positiveness.forEach(function(x) { counts[x] = counts[x]+1 });
      console.log(counts)
      setPieChartData({...pieChartData, datasets: [
        {
          data: [counts['Positive'], counts['Negative'], counts['Neutral']],
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
  }

  function render_pie_chart() {
    if (searchResults.length !== 0) {
      const result = searchResults.reduce((r, {_source}) => {
        let dateObj = new Date(_source.post_date);
        let monthyear = dateObj.toLocaleString("fr-ca", { month: "numeric", year: 'numeric' });
        if(!r[monthyear] && _source.sentiment === "Positive") {
          r[monthyear] = {monthyear, positive_count: 1, negative_count: 0, neutral_count: 0}
        }
        else if (!r[monthyear] && _source.sentiment === "Negative") {
          r[monthyear] = {monthyear, positive_count: 0, negative_count: 1, neutral_count: 0}
        }
        else if (!r[monthyear] && _source.sentiment === "Neutral") {
          r[monthyear] = {monthyear, positive_count: 0, negative_count: 0, neutral_count: 1}
        }
        else if (_source.sentiment === "Positive") r[monthyear].positive_count++;
        else if (_source.sentiment === "Negative") r[monthyear].negative_count++;
        else if (_source.sentiment === "Neutral") r[monthyear].neutral_count++;
        return r;
      }, {})
      
      let result_arr = Object.keys(result).map(e => {
        return result[e];
      });
      result_arr.sort(function (a, b) {
        return a.monthyear.localeCompare(b.monthyear);
      });

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
    e.preventDefault();
    if (company.length !== 0) {
      fetch(`http://localhost:8000/wordcloud/?company=${company}`, {
        method: 'GET'})
        .then(response => response.json())
        .then(data => {
          setWords(data)
        })
    }
  }

  useEffect(() => {
    getSemanticAnalysisData()
    render_pie_chart()
    renderHistogram()
  }, [searchResults])

  useEffect(() => {
    fetch('http://localhost:8000/get_latest_date', {
      method: 'GET'})
      .then(response => response.json())
      .then(data => setLastUpdate(data))

    fetch('http://localhost:8000/get_total_reviews', {
      method: 'GET'})
      .then(response => response.json())
      .then(data => setTotalReviews(data))
  }, [])

  function reqeust_search_result_by_company(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/search_by_company/?company=${company}&query=${company_query}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function reqeust_search_result_by_company_category(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/search_by_company_category/?company_category=${company_category}&query=${company_category_query}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function reqeust_search_result_by_location(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/search_by_location/?location=${location}&query=${location_query}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function reqeust_search_result_by_status(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/search_by_employment_status/?status=${status}&query=${status_query}&company=${company_for_status}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function request_search_result(e, searchText) {
    e.preventDefault();
    
    fetch(`http://localhost:8000/search/?query=${searchText}`, {
      method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.hits.hits)
      })
  }

  function update_index(e) {
    e.preventDefault();
    setLoadText("Fetching...")
    fetch(`http://localhost:8000/add_latest_data?from_date=${lastUpdate}`, {
      method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setLoadText("Fetch Done!")
        setLastUpdate()

        fetch('http://localhost:8000/get_latest_date', {
          method: 'GET'})
          .then(response => response.json())
          .then(data => setLastUpdate(data))

        fetch('http://localhost:8000/get_total_reviews', {
          method: 'GET'})
          .then(response => response.json())
          .then(data => setTotalReviews(data))
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
      Search keywords: <input type="text" value={company_query} onChange={e => setCompanyQuery(e.target.value)} />
      Company name: <input type="text" value={company} onChange={e => setCompanyCategory(e.target.value)} />
      <button onClick={e => reqeust_search_result_by_company(e)}>
        Go
      </button>
      <button onClick={e => clear_query(e)}>Clear Query</button>

      <p>Search by company category</p>
      Search keywords: <input type="text" value={company_category_query} onChange={e => setCompanyCategoryQuery(e.target.value)} />
      Category: <input type="text" value={company_category} onChange={e => setCompanyCategory(e.target.value)} />
      <button onClick={e => reqeust_search_result_by_company_category(e)}>
        Go
      </button>
      <button onClick={e => clear_query(e)}>Clear Query</button>

      <p>Search by location</p>
      Search keywords: <input type="text" value={location_query} onChange={e => setLocationQuery(e.target.value)} />
      Location: <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
      <button onClick={e => reqeust_search_result_by_location(e)}>
        Go
      </button>
      <button onClick={e => clear_query(e)}>Clear Query</button>

      <p>Search by employment status</p>
      Search keywords: <input type="text" value={status_query} onChange={e => setStatusQuery(e.target.value)} />
      Company name: <input type="text" value={company_for_status} onChange={e => setCompanyForStatus(e.target.value)} />
      Employment status: 
      <select id="status" name="status" value={status} onChange={e => setStatus(e.target.value)}>
        <option value="Current Employee">Current Employee</option>
        <option value="Former Employee">Former Employee</option>
      </select>
        
      <button onClick={e => reqeust_search_result_by_status(e)}>
        Go
      </button>
      <button onClick={e => clear_query(e)}>Clear Query</button>

      {searchResults.length !== 0 && <PieChart pieChartData={pieChartData} />}
      {searchResults.length !== 0 && <LineChart lineChartData={lineChartData} />}
      {searchResults.length !== 0 && <Histogram histogramData={histogramData}/>}
      {words.length !== 0 && render_wordcloud()}
      <div>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)} />
        <button onClick={request_wordcloud}>
          Get WordCloud
        </button>
      </div>
      <div>
        Last Updated: {lastUpdate}
        Toal Reviews: {totalReviews}
        <button onClick={(e) => update_index(e)}>
          Fetch Next 5 days Reviews
        </button>
        {loadText}
      </div>
      <ReactTable searchResults={searchResults}/>
    </div>
  );
}

export default App;
