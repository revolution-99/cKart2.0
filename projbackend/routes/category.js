// This is the file where all the routes of category are declared mainly used for naming purposes

// Basic syntax for requiring the express router
var express = require('express');
var router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category");
const {isAuthenticated, isSignedIn,isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

// params goes here
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// actual routes goes here

// The oder of the middlewires are super important. For example here the user first signed in then he should be authenticated to change his own account. The he should be an admin to change his own account.

// This route is for creating a category
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

// This route is for fetching data of a perticular category ('read' mentioned in the coggle map)
router.get("/category/:categoryId", getCategory)

// This route is for fetching data of all categories
router.get("/categories", getAllCategory)

// The router will be useful to update the values
// Inorder to update the values the user should be an admin and should have a category and userId
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

// The router will be useful to delete the datas
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory)


module.exports = router;