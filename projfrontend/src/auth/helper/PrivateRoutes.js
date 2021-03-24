// This is the file for creating private routes which the user can use

import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {isAuthenticated} from "../helper/index";
// Refer the documentation for PrivateRoute : https://reactrouter.com/web/example/auth-workflow

// This component stuff comes from the documentation

const PrivateRoute = ({ component : Component, ...rest }) => {
    return (
      <Route
        {...rest}
        // By adding this prop, I can directly access the routes in the Routes.js without mentioning <Routes></Routes>
        render={ props =>
          isAuthenticated ? (
           < Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;