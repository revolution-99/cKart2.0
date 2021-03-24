// File for containing all the routes to display

import React from "react";
// As BrowserRouter is a long name we attched a nick name to it which is "Router"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Cart from "./core/Cart"
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashboard from "./user/AdminDashBoard"
import UserDashboard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory"
import AddProduct from "./admin/AddProduct"
import ManageCategory from "./admin/ManageCategory"
import ManageProducts from "./admin/ManageProducts"
import UpdateProduct from "./admin/UpdateProduct"

const Routes = () => {
  return (
    // That's how the syntax is. Be familar with it.
    <Router>
      <Switch>
        {/* Defining the path from where to pull the things */}
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path = "/user/dashboard" exact component = {UserDashboard}/>
        <AdminRoute path = "/admin/dashboard" exact component = {AdminDashboard}/>
        <AdminRoute path = "/admin/create/category" exact component = { AddCategory}/>
        <AdminRoute path = "/admin/category" exact component = { ManageCategory}/>
        <AdminRoute path = "/admin/create/product" exact component = { AddProduct}/>
        <AdminRoute path = "/admin/products" exact component = { ManageProducts}/>
        <AdminRoute path = "/admin/product/update/:productId" exact component = { UpdateProduct}/>
      </Switch>
    </Router>
  );
};

export default Routes;
