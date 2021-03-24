// Documentation link for useState : https://reactjs.org/docs/hooks-state.html

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  // Again React syntaxes. Only thing to do is to remember this. The syntax is like whatever you are putting in first the second value will be set____. For e.g: [bayaniii, setBayaniii]
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // Whenever the naming goes long we have to destructure the values
  const { name, email, password, error, success } = values;

  // Part of the application of functional programming of JavaScript
  //   This name will come from the method "onChange" in the <label> Name</lable>
  const handleChanges = name => event => {
    // ...values will fetch all the old values means for every object which are name, email and password I don't have to separetely mention the event.target,value. "...values" will fetch for all
    // The name mentioned above is destructured here and the event.target.value fetches the value from the onChange method in the <label> Name</lable>
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // When an user clicks on the submit button, what are the events are going to occur is described here
  const onSubmit = (event) => {
    //   The default action of submitting the button is prevented and we can do our regular stuff
    event.preventDefault();
    setValues({ ...values, error: false });
    //   This signup is not the same as the signup mentioned in this file rather it is the method that comes from /auth/helper/index.js
    // here name means values.name and so on... We are able to directly call it bcz we have destructured it above
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          // This error comes from the backend
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            // Whatever the user has put in the form of input in the form like in name box, email and password box remains sttll there, even after clicking the submit button. So we need to clear that up. Therefore we are setting the values again to default and "success" to true
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Signup error"));
  };

  // This method holds the signup form (Simple html stuffs)
  const signUpForm = () => {
    return (
      <div className="row">
        {/* md for medium size */}
        {/* offset distributes the columns. In bootstrap there are 12 columns md-6 sets 6 columns. And offset disitrinutes them in equal halves */}
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              {/* form-control adjusts the size of the input form */}
              {/* The "name" come from the name in line 19  */}
              <input
                className="form-control"
                onChange={handleChanges("name")}
                type="text"
                // This will refer to "[name]: event.target.value"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChanges("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChanges("password")}
                type="password"
                value={password}
              />
            </div>
            {/* For onSubmit, we don't need to call it immediately just wait for some events to be happened i.e. taking the input from the user */}
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  // The pop up message of success will be shown by this method
  const successMessage = () => {
    return (
      // Below two lines are used for mainting the same size of alert as of form
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success "
            // If there is a success (values.success) then show it otherwise don't display anything
            style={{ display: success ? "" : "none" }}
          >
            Welcome to cKart !!! Happy Shopping.
            <Link to="/signin">Login</Link> here to continue.
          </div>
        </div>
      </div>
    );
  };

  // The pop up message of error will be shown by this method
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {/* This error will come directly from the backend. The error We have mentioned in the backend */}
          {error}
        </div>
        </div>
      </div>
    );
  };

  return (
    // title and description are JSX attributes just like className
    <Base
      title="SignUp Page"
      description="This is the page for user to sign up"
    >
      {/* signupForm is called here as an immediate method. Therefore a () is used. Notice the difference between signupForm and onSubmit */}
      {signUpForm()}
      {successMessage()}
      {errorMessage()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
