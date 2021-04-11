import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
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

export default function SearchAppBar() {
    const [selectedItem, setSelectedItem] = useState('');
    const [searchText, setSearchText] = useState('');
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
    const classes = useStyles();

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
            case "Company Status":
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

    function reqeust_search_result_by_status(e) {
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

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Material-UI
                    </Typography>
                    <Typography variant="h6">
                        Search By
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
                    {selectedItem === "Location" && <InputBase
                        placeholder="Location"
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
                            placeholder="Company Category"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => setCompanyCategory(e.target.value)}
                        />
                    </div>
                    }
                    {/* <select id="status" name="status" value={status} onChange={e => {console.log(e.target.value); setStatus(e.target.value)}}>
                        <option value="Company">Company</option>
                        <option value="Company Category">Company Category</option>
                        <option value="Location">Location</option>
                        <option value="Employment Status">Employment Status</option>
                    </select> */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
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
    );
}
