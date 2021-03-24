import React, { useState } from "react";
import {  Redirect } from "react-router-dom";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
const Signin = () => {
  const [values, setValues] = useState({
    // Doesn't mandatory to include only objects. Sometimes we inject bollean, arrays or single values
    // Assigning default values to parameters
    email: "sanu3x@gmail.com",
    password: "Sanu@baya3ni",
    error: "",
    loading: false,
    didRedirect: false
  });

  // Destrucuring
  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChanges = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // something is going on. So definatley loading is true
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          // aunthenticate comes from the auth\helper\index.js where two parameters are present. One is data and other is next
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              email: "",
              password: "",
            });
          });
        }
      })
      .catch(console.log("Signin error"));
  };

  //   The method which checks the redirect is working correctly or not
  const performRedirect = () => {

    if (didRedirect) {
      // The user here comes from the isAuthenticated method
      // " user.role === 1" means user is an admin
      if (user && user.role === 1) {
        return  <Redirect to = "/admin/dashboard" />
      } 
      // otherwise he is an user only 
      else {
        return  <Redirect to = "/user/dashboard" />
      }
    }
      if (isAuthenticated()) {
        return <Redirect to="/" />;
      }
    
  };
  // The pop up message of loading will be shown by this method
  const loadingMessage = () => {
    return (
      //   "&&" is a kind of opertaion which is true when both the LHS and RHS is true. Here the 2nd part is just component which is always true. So now if the loading is true (which is set to true by onSubmit method) 2nd part will be thrown out otherwise not. It is called CONDITIONAL RENDERING
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  // The pop up message of success will be shown by this method
//   const successMessage = () => {
//     return (
//       // Below two lines are used for mainting the same size of alert as of form
//       <div className="row">
//         <div className="col-md-6 offset-sm-3 text-left">
//           <div
//             className="alert alert-success "
//             // If there is a success (values.success) then show it otherwise don't display anything
//             style={{ display: success ? "" : "none" }}
//           >
//             Welcome back again !!! Happy Shopping.
//             <Link to="/signin">Login</Link> here to continue.
//           </div>
//         </div>
//       </div>
//     );
//   };

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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                value={email}
                className="form-control"
                type="email"
                onChange={handleChanges("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                value={password}
                className="form-control"
                type="password"
                onChange={handleChanges("password")}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    // title and description are JSX attributes just like className
    <Base
      title="SignIn Page"
      description="This is the page for user to sign in"
    >
      {signInForm()}
      {performRedirect()}
      {loadingMessage()}
      {errorMessage()}
    </Base>
  );
};

export default Signin;
