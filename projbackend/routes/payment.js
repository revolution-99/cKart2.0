// File Info : where all the routes of payment are declared mainly used for naming purposes

// Basic syntax for requiring the express router
var express = require('express');
var router = express.Router();

const {isSignedIn, isAuthenticated} = require("../controllers/auth")
const {getToken, checkOut} = require("../controllers/payment")

// For sending a client token to your client
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)
// For proceeding the payment further
router.post("/payment/checkout/:userId", isSignedIn, isAuthenticated, checkOut)

module.exports = router;
