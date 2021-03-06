// File Info:: This is the file where the routes of category are defined i.e. this file will tell about the working of the routes
// NOTE: Most of the controllers and routes defined here are similar to that of user.js. So I didn't add notes specifically. If you stock at any point please refer to user controller
const Category = require("../models/category");


// This middlewire is used for fetching the data of a perticular id by the param "id"
// Already did in user.js
exports.getCategoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, cat) =>{
        if (err) {
            res.status(400).json({
                error: "Unable to identify the category in DB"
            })  
        }
        // populating the request category by cat. Any name you can give instead of 'category'
        req.category= cat;
        next();
    })
}

exports.createCategory = (req, res) =>{
    // This 'Category' is extarcted from the models/category
    // I am craeting a object "cate" from the class "Category"
    const cate =  new Category(req.body);
    // To save into the database
    cate.save((err, cat) =>{
        if (err) {
            return res.status(400).json({
                error: "Unable to create this category in DB"
            })
        }
        res.json(cat);
    })
}

// Don't think about too much. It simply returns the unique id generated by the middlewire getCategoryById
exports.getCategory = (req,res) =>{
    return res.json(req.category)
}

// Just like the assignment I have done previously given by Hitesh Sir
// We are using only find() to return everything that it conatins
exports.getAllCategory = (req,res) =>{
    Category.find().exec((err, cat) =>{
        if (err) {
            return res.status(400).json({
                error: "Unable to fetch all the categories"
            })
        }
        res.json(cat);
    })
}

exports.updateCategory = (req, res) =>{
    // We are able to fetch the req.category beacause of the middlewire getCategoryById
    const category = req.category;
    // This line is used to grabbing the category name sent from frontend or from the postman
    category.name = req.body.name;
    category.save((err, updatedCat) =>{
        if (err) {
            return res.status(400).json({
                error: "Unable to update the category"
            });
        };
        res.json(updatedCat);
    })
}

exports.removeCategory = (req, res) =>{
    // We are able to fetch the req.category beacause of the middlewire getCategoryById
    const category = req.category;
    // "remove" is an operation of the mongoose 
    category.remove((err, cat) =>{
        if(err){
            return res.status(400).json({
                error: "Unable to remove the category from the DB"
            })
        }
        res.json({
            message: `The category ${cat} is removed successfully`
        });
    })
}