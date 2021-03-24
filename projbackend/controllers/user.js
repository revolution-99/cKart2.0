// File Info:: This is the file where the routes of user are defined i.e. this file will tell about the working of the routes

const User = require("../models/user");
const Order = require("../models/order");

// It is a middlewire
// Params are actually middlewires. Here "id" comes after the next which is a middlewire. You can name this anything other than "id" also.
exports.getUserById = (req,res,next,id) =>{
    // You acn actually serach by findone method also. No key differences between these 2.
    // .exec() will change it into execution method
    User.findById(id).exec((err, user) =>{
        // alreday did and explained in the controller/auth.js file.
        if(err || !user){
            return res.status(400).json({
                error: "No User found in databse"
            });
        }
        // Now I am storing the user into an request object.
        req.profile = user;
        next();
    });
};

// Simple method. No params decalred here. It depends upon the parameter "getUserById" for functioning.
exports.getUser = (req,res) =>{
    
    // If the user signs in, then sensitive informations like encryPassword and salt shouldn't be displayed, therefore I am making them undefined
    // NOTE:: I am not making them undefined in the database. It is declared undefined only in the profile part of the frontend i.e. display is prohibited
    req.profile.salt = undefined;
    req.profile.encryPassword = undefined; 

    // Verifying with the getUserById
    return res.json(req.profile);
}

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        // From the "_id", I am fetching the user
        // Where the _id comes from?
        // userId(from the routes\user.js) => (passes through the middlewire route parm "getUserById")  => populates a field req.profile => id is fetched
        {_id : req.profile._id},
        // What are the values I want to set is set by {&set}
        // From the req.body the frontend part will be kicked in.
        {$set: req.body},
        // 'new' is set to true because updation is going on.
        // `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated(means no longer useful). See: https://mongoosejs.com/docs/deprecations.html#findandmodify
        {new : true, useFindAndModify: false},
        (err, user) =>{
            if(err){
                return res.status(400).json({
                    error: "User has not access to update"
                })
            }
            // If there is no error return the data of the user
            
            user.salt = undefined;
            user.encryPassword = undefined; 
            res.json(user); 
            // But don't show all the datas. Datas like salt and encryPassword don't need to be displayed.
            // I am using user.salt instead of req.profile.salt beacuse we I am receving a user back 
            
        }
    )
}

exports.userPurchaseList = (req,res) =>{
    // It comes from the models/order and then from the user(defined in the models/order)
    // The id comes from the middlewire "getUserById"
    Order.find({user: req.profile._id})
    // Anytime you are going to use the information from other collection, you are going to use the populate()
    // See the documenation https://mongoosejs.com/docs/populate.html to know the use of populate()
    // It's better to read this https://medium.com/@nicknauert/mongooses-model-populate-b844ae6d1ee7
    // populate() passes 2 parameters(1. Which object you want to update? 2. What you want to bring in? )
    .populate("user", "_id name")
    .exec((err, order) =>{
        if(err){
            return res.status(400).json({
                error: "No order in the account"
            })
        }
        return res.json(order);
    })
}

// A middlewire to update purchase
exports.pushOrderInPurchaseList = (req, res, next) => {

    // Because it is mentioned in /models/user.js that purchases has an array value
    let purchases = [];
    // This path is req.body(frontend part) => order(from the orderSchema of models/order) => product(whatever product is in order, we are going to loop through all individually and creates a object from there and push it into the purchases )
    // "products" is the entire list from which I am going to extract a single unit "product"
    req.body.order.products.foreach(product => {
        // As it is an array it is going to push the informations
        purchases.push({
            // These are coming from the models/product.js
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            // Below 2 are coming from models/order.js/productInCartSchema
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    // Storing the above thing in the data base
    // Reaseon for using the findOneAndUpdate is it first serach if the element is already there is not then, it is going to updtae that
    User.findOneAndUpdate(
        // It will serach by the id coming from the frontend
        {_id: req.profile._id},
        {$push : {purchases : purchases}},
         // 'new' is set to true because updation is going on.
        {new : true},
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to updtae your cart"
                })
            }
        }
    )
    next();
}