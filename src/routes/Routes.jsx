import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Order from "./../pages/Order";
import Bill from "../pages/Bill";
import Dashboard from "./../pages/Dashboard";

const Routes = () => {
  return (
    <div style={{ marginTop: "200px" }}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/catalog/:slug" component={Product} />
        <Route path="/catalog" component={Catalog} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/order" component={Order} />
        <Route path="/bill/:id" component={Bill} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Routes;
