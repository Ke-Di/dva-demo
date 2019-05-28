import React from "react";
import { Router, Route, Switch } from "dva/router";

import MainLayout from "./routes/layout/Index";
import IndexPage from "./routes/home/IndexPage";
import Table from "./routes/table/Index";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <MainLayout>
          <Route path="/" exact component={IndexPage} />
          <Route path="/home" exact component={IndexPage} />
          <Route path="/table" exact component={Table} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
