// File Info: This is the file where all the routes of product are declared mainly used for naming purposes

// Basic syntax for requiring the express router
const express = require('express')
const router = express.Router();

// Fetching the controllers
const{getProductById, createProduct, getProduct, photo, removeProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");
const{isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const{ getUser, getUserById} = require("../controllers/user");

// All parameteres are declared here
router.param("userId", getUserById)
router.param("productId", getProductById)

// All routess are declared here

// Below 2 routes is for reading the product datas
router.get("/product/:productId", isSignedIn, getProduct);

// It is a special case, as I have defined the "req.product.photo = undefined" in the controllers, Therefore I have to make an explicit route for this.
router.get("/product/photo/:productId", photo);

// This route is for creating the product
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct )

// This route is for deleting the product
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct)

// This route is for updating the product
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

// This route is for listing products i.e. it will be the home page
router.get("/products", getAllProducts);

// This route is for putting the products in categories
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
