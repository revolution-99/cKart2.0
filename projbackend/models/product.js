// This is the file where product schema is defined. Here the product means when viewing a product in home page what are the features that the product contain
// const { trim } = require("lodash");
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
// const category = require("./category");


const productSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 3000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32,
    },
    // The product category here is linked to our category schema here
    category:{
        type: ObjectId,
        // We are pulling the reference from where it is thrown i.e. from line 15 of category.js "module.exports = mongoose.model("Category", categorySchema)"
        ref: "Category",
        required: true
    },
    stock:{
        type: Number
    },
    sold:{
        type: Number,
        default: 0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    size:{
        type: String,
        trim: true,
        maxlength: 10
        // required: true
    }
    // May mention a return policy here
},
{timeStamp: true}
)

module.exports = mongoose.model("Product", productSchema)