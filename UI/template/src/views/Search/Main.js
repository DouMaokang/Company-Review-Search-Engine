import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
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
import Table from "components/Table/Table.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/search-react/views/searchStyle.js";
import LatestProducts from "../Dashboard/LatestProducts";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Toolbar from "./Toolbar";
import Examples from "./Examples";

const useStyles = makeStyles(styles);

export default function Main() {
    const classes = useStyles();
    return (
        <div style={{position: "relative"}}>
            <div className={classes.searchBox}>
                <Typography variant={"h1"} style={{color: "white"}} align={"center"}>
                    Search
                </Typography>
                <Toolbar />

            </div>

            <Container className={classes.exampleBox}>
                <Examples />
            </Container>

            <Container>
                <GridContainer>
                    <GridItem xs={12} sm={12} >
                        <LatestProducts />
                    </GridItem>
                </GridContainer>
            </Container>
        </div>
    );
}
