import React from "react";
import { Switch, Route } from "react-router";
import Main from "pages/main/main";
import Layout from "components/layout/layout";
import Axes from "pages/axes/axes";
import Axe from "pages/axe/axe";
import Comments from "pages/comments/comments";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/axes" exact component={Axes} />
        <Route path="/axe/:slug" component={Axe} />
        <Route path="/comments" component={Comments} />
      </Switch>
    </Layout>
  );
};

export default Routes;
