// File Info:: This is the file where the routes of authentication are defined i.e. this file will tell about the working of the routes

// Documentition for signup route : https://express-validator.github.io/docs/index.html

// What is req.body? I can refer to this http://expressjs.com/en/api.html#req.body but it is easy to understand from the below example
// (req.body, ' ' , ' ') --> here req is the parameter of your function and using this parameter your can access the properties over then url.
// so look this example
// suppose this is form 
// <form>
// enter the name : <input type="text" name="name">
// <button type ="submit"> submit </button> 
// </form>

// so if you want to access the name -- which is filled by the user end.
// so for this you can 
// do like this->   console.log(req.body.name);  -- this will print the name (property) in console.

// It is a covention to name this parameter (User) similar to that of the name in user.js(i.e. what is exported in User.js(refer to last line code of User.js))
const User = require("../models/user");

const { check, validationResult } = require('express-validator');


// Syntax for accessing the jsonwebtoken
var jwt = require('jsonwebtoken');

// Syntax for accessing the expressjwt
// In the documentation jwt is used instead of "expressJwt". As we have already declared a variable jwt for jsonwebtoken, we are using expressJwt here.
var expressJwt = require('express-jwt');

// Have to use exports here. const signup ="..............." is technically correct, but here we have to send these responses. So exports is used.

// This piece of code is used to save the signup route in the data base
exports.signup = (req, res) =>{
    // // It is generally a covention to put "REQ-BODY" in block letter. So that it is found. The reason of using the "req.body" is to access the body parser
    // console.log("REQ-BODY", req.body);
    // res.json({
    //     message: "User Signup"
    // })

    // This error syntax will used for checking the validation of check() statements written in routes/auth.js and it comes from the documentation
    const errors = validationResult(req);
    //  If error is there then shows the return message
    if (!errors.isEmpty()) {
        return res.status(422).json({
            // This also comes from the documentation
            error: errors.array()[0].msg
        })
    }

    // Here "new" is used for creating the object "user" from the class of "User"
    const user = new User(req.body);
    // "user.save()" saves the user in the database
    // "(err, user)" is a normal snippet as "(req,res)". Anything related to the data base either gives us an error or the parameter back.
    // ".status(400)" sends an status(error) code
    // The reason of using json is if json is parsed correctly it is easy for the frontend develoer to craft an error meassge based on this responses.
    user.save( (err, user) => {
        if(err ){
            // console.log(err);
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }
        // If there is no error, then throws this.
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};

// This piece of code is used to save the signin route in the data base
exports.signin = (req,res) =>{

    const errors = validationResult(req);
    // This is called the destructuring i.e. from the user we just pick only email and password
    const {email, password} = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    // "findOne()" finds excatly one match from the database. If there are several matchings the very first one will be picked
    // In place of "user" we can use "student" or anything etc
    User.findOne({email}, (err, user) => {
        // If there is error or it is not the user then throw your custom error message
        if (err || !user) {
            return res.status(400).json({
                error: "User email is not registered"
            })
        }

        // We have a password in the models/user.js and we have named it "planpassword" and we have defined a method of named "authenticate()" in the user. We have just extracted that authenticate password function/method and if the password that we're going to input matches with the plainpassword (which is in the user) then it will be valid.
        if (!user.authenticate(password)) {

            // Here we use the return so that after the password nothing comes. return is used in this testcases

            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        // Normal syntax for creating a token. It can be found in the documentation of "jsonwebtoken".
        // It passes a key value pair followed by a string which can be anything. In this line instead of using the string multiple times, we have defined it as a SECRET(any name can be given) which is stored in the .env file.
        const token = jwt.sign({_id: user._id}, 'secret');

        // Put the token into cookie
        // It is also a key value pair followed by an expire. In real world application this expire should be shrinked.
        res.cookie("token", token, {expire: new Date()+ 9999999})

        // Send response to the frontend part
        const {_id, name, email, role} = user;

        // Send the token so that frontend part can store it in the local storage
        return res.json({token, user:{_id, name, email, role}});
    })
    
}

exports.signout = (req, res) => {
    // When an user signs out all the cookies should be cleared up, hence clearCookie(). Here the cookie i.e. created is token
    res.clearCookie("token");
    res.json({
        message: "User sign out successfully"
    });
};

// protected routes
// We will take the help of cookie parser and body parser to protect the routes. So make sure to do install and declare it before im=n app.js


// 1. isSignedIn checks the user is signed in or not
// Refer this documentaion https://www.npmjs.com/package/express-jwt
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    // secret: 'secret',
    //  algorithms: ['HS256'],
    // userProperty ia an expressJwt option and it works on request handler which is a string ( auth here)
    userProperty: "auth"
})

// Custom middlewires. 
// Till now we have dealed with predefined middlewires like body parser, cookie parser etc. So we dirctly do copying and pasting from the documentation. This is the first custom middle wire of our program. So we have to define "next" and also have to pass it accordingly. 

exports.isAuthenticated = (req, res, next) =>{
    // req.profile comes from the frontend part
    // req.auth comes from the middlewire isSignedIn
    // If there is a profile coming from frontend and user is authorised and the id comes from the frontend part if same as the id thrown by the middlewire then only the user is aunthenticated otherwise it will throw the error code of 403 with the message "Access Denied"
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error :"Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) =>{
    // profile should be sent by the frontend 
    // Where the "role" comes from and why it is 0?
    // Well the role comes from the models/user.js. Because it's default value is set to 0, all the users with role value of 0 are users (customers) not the admin.
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You don't have admin access"
        })
    }
    next();
}