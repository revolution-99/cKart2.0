import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  // Common react syntax of useState
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  // Fetching all the products from "getAllProducts" from adminapicall
  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        // Throws the error from the backend
        console.log(data.error);
      } else {
        // setProducts is property of useState
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  // Method for deleting a product
  const deleteMyProduct = (productId) => {
    // removeProduct comes from adminapicall
    deleteProduct(productId, user._id, token).then(data => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        // After deletion again calls the preloadProducts to update the bashboard with the selected item being deleted
        preload();
      }
    });
};

  return (
    <Base title="Welcome" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
          {products.map((products, index) => {
            return(
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{products.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${products._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                {/* In react it is not a convinent way to directly calls the function insted go for a call back using arrow function. Bz deleteMyProduct passes a parameter "product._id. So how this method can be passsed as a parameter" */}
                <button
                  onClick={() => {
                    deleteMyProduct(products._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
            )
           
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
