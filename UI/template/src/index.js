
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Dashboard from "./views/Dashboard";
import Search from "./views/Search";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
        <Route path="/" component={Dashboard} />
        {/* <Route path="/" component={Search} /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
