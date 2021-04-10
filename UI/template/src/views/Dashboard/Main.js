import React, {useState, useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// React Wordclou
import ReactWordcloud from 'react-wordcloud';
import Container from '@material-ui/core/Container';

// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Danger from "components/Typography/Danger.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Histogram from '../Components/Histogram'
import PieChart from '../Components/PieChart'
import LineChart from '../Components/LineChart'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import LatestProducts from "./LatestProducts";
import Sales from "./Sales";
import { CardContent } from "@material-ui/core";
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Chip,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';


const useStyles = makeStyles(styles);

const useStyles1 = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
  },
  menuButton: {
      marginRight: theme.spacing(2),
  },
  title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
          display: 'block',
      },
  },
  search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: '100%',
      [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
      },
  },
  searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  inputRoot: {
      color: 'inherit',
  },
  inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
              width: '20ch',
          },
      },
  },
}));

export default function Main() {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState('');
  const [searchText, setSearchText] = useState('');
  const [words, setWords] = useState([]);
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [company_category, setCompanyCategory] = useState('');
  const [status, setStatus] = useState('Current Employee');
  const [company_for_status, setCompanyForStatus] = useState('');
  const [company_for_wordcloud, setCompanyForWordcloud] = useState('');
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

  function request_wordcloud() {
    setWords([])
    if (company.length !== 0) {
      fetch(`http://localhost:8000/wordcloud/?company=${company}`, {
        method: 'GET'})
        .then(response => response.json())
        .then(data => {
          setWords(data)
        })
    }
  }

  function reqeust_search_result_by_status(e) {
    console.log("123")
    e.preventDefault();
    fetch(`http://localhost:8000/search_by_employment_status/?status=${status}&query=${searchText}&company=${company_for_status}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function request_search_result_by_location(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/search_by_location/?location=${location}&query=${searchText}`, {
    method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setSearchResults(data.hits.hits)
    })
  }

  function request_search_result_by_company(e) {
      e.preventDefault();
      fetch(`http://localhost:8000/search_by_company/?company=${company}&query=${searchText}`, {
      method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.hits.hits)
      })
    }
  
    function request_search_result_by_company_category(e) {
      e.preventDefault();
      fetch(`http://localhost:8000/search_by_company_category/?company_category=${company_category}&query=${searchText}`, {
      method: 'GET'})
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.hits.hits)
      })
    }

  function request_search_result(e, searchText) {
    e.preventDefault();

    switch(selectedItem) {
        case "Company": 
            request_search_result_by_company(e)
            break;
        case "Company Category":
            request_search_result_by_company_category(e)
            break;
        case "Location":
            request_search_result_by_location(e)
            break;
        case "Employment Status":
            reqeust_search_result_by_status(e)
            break;
        default:
            fetch(`http://localhost:8000/search/?query=${searchText}`, {
                method: 'GET'})
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data.hits.hits)
                })

    }
  }

  useEffect(() => {
    getSemanticAnalysisData()
    render_line_chart()
    renderHistogram()
    request_wordcloud()
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

  function render_line_chart() {
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

  function render_wordcloud() {
    return (<div style={{ height: 400, width: 600 }}>
      <ReactWordcloud words={words} options={options}/>
    </div>)
  }

  function onMarkIrrelevant(unlike) {
    var like = []
    searchResults.slice(0, 5).map((item) => {
      if (item._id != unlike) {
        like.push(item._id)
      }
    })
    if (company != "") {
      fetch(`http://localhost:8000/feedback/?company=${company}&query=${searchText}`, {
        method: 'POST',
        body: JSON.stringify({
          "like": like,
          "unlike": unlike
        }),
        headers: { "Content-Type": "application/json" },
      })
          .then(response => response.json())
          .then(data => {
            setSearchResults(data.hits.hits)
          })
    }
  }


  return (
    <div>
      {/* App Bar */}
      <div className={classes.root}>
        <div style={{marginBottom: "8px"}}>
          <AppBar position="static">
            <Toolbar style={{backgroundColor: "white", display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" style={{color: "black"}}>
                Last Updated: {lastUpdate}
              </Typography>
              <Typography variant="h6" style={{color: "black"}}>
                Total Reviews: {totalReviews}
              </Typography>
              <Button variant="contained" onClick={(e) => update_index(e)}>
                Fetch Next 5 days Reviews
              </Button>
              {loadText}
            </Toolbar>
          </AppBar>
        </div>
      
            <AppBar position="static">
                <Toolbar style={{backgroundColor: "white", display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6" style={{color: "black"}}>
                        Filter
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedItem}
                        onChange={e => setSelectedItem(e.target.value)}
                        >
                        <MenuItem value={"Company"}>Company</MenuItem>
                        <MenuItem value={"Company Category"}>Company Category</MenuItem>
                        <MenuItem value={"Location"}>Location</MenuItem>
                        <MenuItem value={"Employment Status"}>Employment Status</MenuItem>
                    </Select>
                    {selectedItem === "Company" && <InputBase
                        placeholder="Company"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => setCompany(e.target.value)}
                    />}
                    {selectedItem === "Location" && <InputBase
                        placeholder="Location"
                        style={{backgroundColor: "white"}}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => setLocation(e.target.value)}
                    />}
                    {selectedItem === "Company Category" && <InputBase
                        placeholder="Company Category"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => setCompanyCategory(e.target.value)}
                    />}
                    {selectedItem === "Employment Status" &&
                    <div>
                        <Select
                            labelId="employment_status"
                            id="employment_status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            >
                            <MenuItem value={"Current Employee"}>Current Employee</MenuItem>
                            <MenuItem value={"Former Employee"}>Former Employee</MenuItem>
                        </Select>
                        <InputBase
                            placeholder="Company"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => setCompanyForStatus(e.target.value)}
                        />
                    </div>
                    }
                    <div className={classes.search}>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => setSearchText(e.target.value)}
                        />
                    </div>
                    <Button variant="contained" onClick={e => request_search_result(e, searchText)}>Go</Button>
                </Toolbar>
            </AppBar>
        </div>

      {searchResults.length == 0? null : 
      <GridContainer>
      <GridItem xs={12}>
        
      <Card style={{marginTop: "8px"}}>
        <Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell size="small">Review</TableCell>
                <TableCell size="small">Sentiment</TableCell>
                <TableCell size="small">Company</TableCell>
                <TableCell size="small">Location</TableCell>
                <TableCell size="small">Status</TableCell>
                <TableCell size="small">Category</TableCell>
                <TableCell size="small">Relevance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {searchResults.slice(0, 10).map((row) => 
                <TableRow key={row._id}>
                <TableCell align="left">{row._source.review_raw}</TableCell>
                <TableCell align="left">{row._source.sentiment}</TableCell>
                <TableCell align="left">
                  {row._source.company}
                </TableCell>
                <TableCell align="left">{row._source.location}</TableCell>
                <TableCell align="left">{row._source.job_title}</TableCell>
                <TableCell align="left">{row._source.category}</TableCell>
                <TableCell>
                  <Button onClick={() => onMarkIrrelevant(row._id)}>
                    Mark as irrelevant
                  </Button>
                </TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>

          </Box>
      </Card>
      
      </GridItem>
      <GridItem xs={12} sm={12} md={6} >
        <Card chart style={{marginTop: "16px"}}>
            <CardHeader color="rose" plain={true}>Worldcloud</CardHeader>
            <CardContent>
              {/* <InputBase
                  placeholder="Company"
                  classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setCompanyForWordcloud(e.target.value)}
              />
              <Button onClick={request_wordcloud}>
                Get WordCloud
              </Button> */}
              {words.length !== 0 && render_wordcloud()}
          </CardContent>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6} >
        <Card chart style={{marginTop: "16px"}}>
            <CardHeader color="rose" plain={true}>Top 5 Review Count</CardHeader>
            <CardContent>
              <Histogram histogramData={histogramData}/>
          </CardContent>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6} >
        <Card chart style={{marginTop: "16px"}}>
            <CardHeader color="rose" plain={true}>Sentiment Analysis</CardHeader>
            <CardContent>
              <PieChart pieChartData={pieChartData} />
          </CardContent>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6} >
        <Card chart style={{marginTop: "16px"}}>
            <CardHeader color="rose" plain={true}>Review Sentiment Trend</CardHeader>
            <CardContent>
              <LineChart lineChartData={lineChartData} />
          </CardContent>
        </Card>
      </GridItem>
    </GridContainer>


}
      </div>
  );
}