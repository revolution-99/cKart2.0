import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  
  // As defined in the user/helper/signin.js
  const [ name, setName ] = useState("");
  const [ error, setError ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  // This is the same token I had passed in the Postman while testing routes
  const { user, token } = isAuthenticated();

  // To add a back button to the dashboard page
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Back to dashboard
      </Link>
    </div>
  );

  // To handle the changes
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  // The events that will happen after user clicks submit
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // backend request processed here
    // createCategory comes from the/admin/helper/adminapicall which contains 3 parameters userId, token and category
    createCategory(user._id, token, { name }).then(data=> {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("")
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-success">Category is not listed</h4>;
    }
  };
  // The form body
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For example summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create your Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a new category here"
      description="Add your prefer category to products"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
