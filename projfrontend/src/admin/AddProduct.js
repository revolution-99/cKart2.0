import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Redirect, Link } from "react-router-dom";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    categories: [],
    loading: false,
    error: "",
    // The product just being created
    createdProduct: "",
    // Redirect the user back into home page
    getRedirect: false,
    // The form I am using in the createProductForm is not actuallya HTML form, We need to prepare that in a regular object (formData here) which can be submitted to the backend. And these things directly comes from React Documentation
    formData: "",
  });

  // Destructuring
  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    loading,
    photo,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  //   Preload the stuffs before opening the page. As this is the AddProduct page, we are setting all the values to empty

  const preload = () => {
    //   From admin/apicalls
    getAllCategories().then((data) => {
      // console.log(data);
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    // event.target.files[0] means I want to load the file from it's path
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // This enables directly to pass it on the backend
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // The events happen after adding a product
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    // The information of the product comes from the formData
    createProduct(user._id, token, formData).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          // category: "",
          // categories: [],
          loading: false,
          // error: "",
          createdProduct: data.name,
          getRedirect: true,
        });
      }
    });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      // If createdProduct is there, then only display otherwise no display
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully.</h4>
    </div>
  );

  const loadingMessage = () => (
    loading && (<div
      className="alert alert-success mt-3"
    >
      <h2>Loading...</h2>
    </div>)
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  // After the submission re direct the user to admin dashboard
  const didRedirect = () =>{
    if (getRedirect) {
      setTimeout( () =>{
       window.location.href = '/admin/dashboard'}, 2000)
      
  }
}
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {/* Alreday discussed about this in "&&" syntax */}
          {categories &&
            categories.map((cat, index) => (
              // In the postman I am also using the same value
              <option key={index} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Create Product
        </button>
      </div>
    </form>
  );
  return (
    <Base
      title="Add a product here"
      description="Welcome to product creation centre"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {loadingMessage()}
          {errorMessage()}
          {didRedirect()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
