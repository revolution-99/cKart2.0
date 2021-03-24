// File for displaying the user dashboard

import React from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const AdminDashboard = () => {
  // Fetching the model/user from the backend and destructuring
  const {
    user: { name, email},
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>

        <div className="btn-group dropright">
          <button
            type="button"
            className="btn btn-light dropdown-toggle"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Category
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li className="dropdown-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="dropdown-item">
            <Link to="/admin/category" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          </div>
        </div>

        <div className="btn-group dropright">
          <button
            type="button"
            className="btn btn-light dropdown-toggle"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Product
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Products
            </Link>
          </li>
          <li className="dropdown-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          </div>
        </div>
        <button
            type="button"
            className="btn btn-light"
            id="dropdownMenuButton"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Manage Order
          </button>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      // mb-4 will add buttom margin of 4
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white">Your cKart</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">Admin Panel</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title={`Welcome back ${name} !!!`}
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
