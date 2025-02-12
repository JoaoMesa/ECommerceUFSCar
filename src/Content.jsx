// content.jsx
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Store } from "./pages/store";
import { Cart } from "./pages/cart";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { AdminProducts } from "./pages/admin";
import { LoginAdmin } from "./pages/loginadmin";
import { AdminOrders } from "./pages/adminOrders";

export const Content = () => {
  return (
    <Switch>
      <Route exact path="/" component={Store} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
	<Route exact path= "/loginadmin" component={LoginAdmin} />
      <Route exact path="/admin" component={AdminProducts} />
      <Route exact path="/admin/orders" component={AdminOrders} />
    </Switch>
  );
};
