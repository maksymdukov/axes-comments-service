import React from "react";
import { Switch, Route } from "react-router";
import Layout from "components/layout/layout";
import Comments from "pages/comments/comments";
import Orders from "pages/orders/orders";
import Gallery from "pages/gallery/gallery";
import Products from "pages/products/products";
import Slides from "pages/slides/slides";
import ReviewSlides from "pages/review-slides/review-slides";
import Infopages from "pages/infopages/infopages";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Comments} />
        <Route path="/gallery" exact component={Gallery} />
        <Route path="/products" exact component={Products} />
        <Route path="/slides" exact component={Slides} />
        <Route path="/review-slides" exact component={ReviewSlides} />
        <Route path="/orders" component={Orders} />
        <Route path="/pages" component={Infopages} />
      </Switch>
    </Layout>
  );
};

export default Routes;
