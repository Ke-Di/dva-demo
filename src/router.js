import React from "react";
import { Router, Route, Switch } from "dva/router";

import MainLayout from "./components/layout/Index";
import IndexPage from "./routes/IndexPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <MainLayout>
          <Route path="/" exact component={IndexPage} />
          <Route path="/home" exact component={IndexPage} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
