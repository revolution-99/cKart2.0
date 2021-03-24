// This is the file where all the routes of authentication are declared mainly used for naming purposes

var express = require('express')
// The 'R' in this 'Router' should be capital.
var router = express.Router();

// Syntax for accessing the express validator
const { check } = require("express-validator");

// It is the defalut syntax like the object
const {signout, signup, signin, isSignedIn} = require("../controllers/auth");

// The validator[...........] should be placed after the route ("/signup" here) and before the controller(signup here)

// This is the signup router
router.post("/signup", [
    // We can also put these custom error messages as : check('name').isLength({min:5}).withMessage('name must be at least 3 charachters long'). This is the way mentioned in the documentation.
    check('name', 'name must be at least 3 charachters long').isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 5 char long").isLength({ min: 5 })

], signup);

// This is the signin router
router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 5 })

], signin);

// This signout the signout router
router.get("/signout", signout);

// This is a testing route to test isSignedIn is working correctly or not
router.get("/testroute", isSignedIn, (req, res)=>{
    // Because the middlewire "isSignedIn" put the auth into request. Therefore a request is used here.
    res.json(req.auth)
})
module.exports = router;