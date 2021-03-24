// File Info:: This is the file where the routes of category are defined i.e. this file will tell about the working of the routes

const Product = require("../models/product");

// General syntaxes for the form data. Refer the documentation
// Why you need form data here?
// Ans: When the we want user to upload any binary datas like images,audio files or pdfs, it can't be done by json perfectly. Here form data comes into use. 
// For the form-data I have used the 'formidible' library. There are other libraies also. For eg.: busboy(handles multiple things but kittk=le bit difficult) , multer (also I can consider it) etc.
// Documetation link of the formidible :https://www.npmjs.com/package/formidable
const formidable = require("formidable");
const _ = require("lodash");
// fs for "File System". Don't come with package.json, it's a default one.
const fs = require("fs");

exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
    // populate the product based on category.
    .populate("category")
    .exec((err, product)=>{
        if (err) {
            return res.status(400).json({
                error: "Unable to find the product in the DB"
            })
        }
        req.product = product;
        next();
    }) 
}

exports.createProduct= (req,res) =>{
    // Creation of a form data. General syntax
    let form = new formidable.IncomingForm();   
    // By turning this true, it allows jpg or png files
    form.keepExtensions = true;
    // It expects 3 parameteres. 1. error 2. field(name,description,price etc.) 3. files
    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with the image"
            })
        }
        // Destructure the fields
        const {name, description, price, category, stock} = fields;


au
        // Here I will do some changes after the completition of the course. i.e. I should add specific error message and restirctions for each (name, description, category etc) like I have done in the auth.js



        if(
            !name ||
            !description ||
            !category ||
            !price ||
            !stock
        ){
            return res.status(400).json({
                error: "All fields are not included"
            })
        }

        // "product" is gonna created based on fields which comes from "Product"
        let product = new Product(fields);

        // handles the file
        if (file.photo) {
            // Image size: 2MB( 1024 * 1024 * 2 == 3000000(aprox)) 
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size exceeded"
                })
            }
            // "photo" comes from the models/product. Mention the exact name as mentioned in the models. Here "photo".
            // I am passing this readFileSync() on formidable to grab the exact path
            product.photo.data = fs.readFileSync(file.photo.path);
            // I am mentiioning a contentType for the database
            product.photo.contentType = file.photo.type;
        }

        // Save to the DB
        product.save((err, tees) =>{
            if(err){
                return res.status(400).json({
                    error: "Unable to save the product in DB"
                })
            }
            res.json(tees);
        })
    })
}

exports.getProduct = (req, res) =>{
    req.product.photo = undefined;
    // Thanks to our middlewire "getProductById", I am able to fetch the data from req.body 
    return res.json(req.product);
}

// Photos and mp3s etc can't be proceesed by a get request. Because these requests are so bulcky and huge that it is not easy to save in dataabase.
// Therefore I am definig a middlewire
exports.photo = (req, res, next) =>{
    // This simply means that if there are some data, then return that data
    if(req.product.photo.data){
        // Setting a content-type from the photo.
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
} 

exports.removeProduct = (req, res) =>{
    let product = req.product;
    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: "Unable to remove the product"
            })
        }
        res.json({
            message: `${deletedProduct} is removed successfully`
        })
    })
}

// The updation is very similar to that of the creation of route. In the creation, I am saving the data. When the updation page is gonna load, I am pulling the database created and then fill up the fields with that information. And when the user hits the save, I am going to save the information on top of that.
exports.updateProduct = (req,res) =>{
    // Creation of a form data. General syntax
    let form = new formidable.IncomingForm();   
    // By turning this true, it allows jpg or png files
    form.keepExtensions = true;
    // It expects 3 parameteres. 1. error 2. field(name,description,price etc.) 3. files
    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with the image"
            })
        }
        //Unlike createProduct we don't need a new product here. Instead we are fetching the old product data
        // Where this product comes from?
        // The product comes from the route "createproduct" which fires the param "getProductById". And finally the product is fetched.
        let product = req.product;
        // Feature of the loadash
        // "_.extend" takes the values in the object and extends that  i.e. all the updation values involved there.
        // product: What are the fields I am looking for.
        // fields: provide the necessary required fields. it is in the formidable
        // fields are going to updated inside the product
        product = _.extend(product, fields)
        // handles the file
        if (file.photo) {
            // Image size: 2MB( 1024 * 1024 * 2 == 3000000(aprox)) 
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size exceeded"
                })
            }
            // "photo" comes from the models/product. Mention the exact name as mentioned in the models. Here "photo".
            // I am passing this readFileSync() on formidable to grab the exact path
            product.photo.data = fs.readFileSync(file.photo.path);
            // I am mentiioning a contentType for the database
            product.photo.contentType = file.photo.type;
        }

        // Save to the DB
        product.save((err, product) =>{
            if(err){
                res.status(400).json({
                    error: "Unable to update the product in DB"
                })
            }
            res.json(product);
        })
    })
}

exports.getAllProducts = (req, res) =>{
    // It means that if there is a query from the frontend and it has a prperty of .limit then it will throw it otherwise it will show 3 (default value)
    // Whenever you are taking any parameter from user, handle it as string. (irrespective of any languages e.g.- c,c++,java, js etc). Therefore I have put the "req.query.limit" into parseInt
    let limited = req.query.limit ? parseInt(req.query.limit) : 3;
    // It means that if there is sorting then it will throw the sort by ascending order otherwise it will sort by id (default value)
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    // It simply means don't select the photo
    .select("-photo")
    // General syntax of the sort. It means that I am sorting by ascending order.
    .sort([[sortBy, "asc"]])
    // limit sets the restriction that these are things I want to show.
    .limit(limited)
    // later on studied
    .populate("category")
    .exec((err, allProducts) =>{
        if(err){
            return res.status(400).json({
                error: "Unable to fetch all the products"
            })
        }
        res.json(allProducts)
    })
}

exports.getAllUniqueCategories = (req, res) =>{
    // Instead of findById(), we are using distinct() to find out the unique elements
    // It also passes 3 parameters. fields, options a callback
    Product.distinct("category", {}, (err, category) =>{
        if (err) {
            return res.status(400).json({
                error: "No unique category found"
            })
        }
        res.json(category);
    })
} 

// A middlewire for updating the inventory i.e. maintaing a inverse propertion relation with stock and sold
exports.updateStock = (req, res, next) =>{
    // I am fetching the datas from models/order and from the order specific "products". (Defined in the model, go and check that) 
    // "map" is used for looping through the every single products
    let inverseOperations = req.body.order.products.map(prod =>{
        return {
            // Refer documentation where you get stu ck, Like I have stuck in "updateOne"
            updateOne:{
                // "filter" is used for find out the product based on _id. _id value is whatever the product I have got
                filter : {_id: prod._id},
                // Now I an going for updtaion. Wherever there is a update, we have to fire a variable, which is increamented.
                // sold should be updated as an increament count and we are fetching the count from the frontend
                update : {$inc : {stock: -prod.count, sold : +prod.count}}
            }
        }
    })
    // For changing no. of stock and sold, I have used a single middlewire bulkWrite 
    // Refer the documentation for understanding https://mongoosejs.com/docs/api/model.html#model_Model.bulkWrite
    // bulkWrite() requires 3 parameters i.e. ops, options and returns
    Product.bulkWrite(inverseOperations, {}, (err, otherProd) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
    })
    next();
}