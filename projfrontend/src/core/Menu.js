// Rfer this awesome document yo know abouth react-ronder-dom https://reactrouter.com/web/guides/quick-start
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

// creates a method "currentTab" which passes 2 parameters
const currentTab = (history, path) => {
  // If the path is equal to the current path then make it active by showing this color
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  }
  // otherwise make it white
  else {
    return { color: "#FFFFFF" };
  }
};

// history will be passed otherwise it will show the error
const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        {/* Injecting the method into CSS */}
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {/* Don't forget to call isAuthenticate as "isAuthenticate()" */}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            User Dashboord
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboaord
          </Link>
        </li>
      )}
      {/* Fragments: A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM. See the documentation here : https://reactjs.org/docs/fragments.html#short-syntax*/}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              SignIn
            </Link>
          </li>
        </Fragment>
      )}

      {/* This is called conditional rendering already explained in /user/signup/performRedirect method */}
      {isAuthenticated() && (
        <li
          className="nav-item"
          //  I can absoluely do it. When an user clicks the Signout it will be signed out.But I want to add couple more functionality. If the user signs out successfully I want also to redirect him/her into
          // onClick = { signout() }
          onClick={() => {
            signout(() => {
              history.push("/");
            });
          }}
        >
          <Link
            style={currentTab(history, "/signout")}
            className="nav-link"
            to="/signout"
          >
            SignOut
          </Link>
        </li>
      )}
    </ul>
  </div>
);

// withRouter is implemented just like that. React package will take care of it.
export default withRouter(Menu);
