// This is the file where all the routes of user are declared mainly used for naming purposes

// Basic syntax for requiring the express router
const express = require('express');
const router = express.Router();

// Fetching the getUserById, getUser from the ../controllers/user.js
const {getUserById, getUser, updateUser, userPurchaseList} = require("../controllers/user.js");
// Similar like above one
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth.js");

// As per the documentation, general syntax
// Documentation Link : https://expressjs.com/en/4x/api.html#router.param

// This route is used for getting all the information of an user
router.param("userId", getUserById);

// This route is for getting the userId ("read" mentioned in the coggle map) which ensures that before getting access to the profile the user should be signedin, authenticated
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// This route is used for updating the values if the user make any changes
// "PUT" request is used for updating values.
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// This route is used for fetching the purchase list of the user sent by frontend part i.e. profile
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;
