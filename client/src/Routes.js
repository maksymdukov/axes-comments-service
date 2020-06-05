import React from "react";
import { Switch, Route } from "react-router";
import Layout from "components/layout/layout";
import Axes from "pages/axes/axes";
import Axe from "pages/axe/axe";
import Comments from "pages/comments/comments";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Comments} />
        <Route path="/axes" exact component={Axes} />
        <Route path="/axe/:slug" component={Axe} />
      </Switch>
    </Layout>
  );
};

export default Routes;
