// This is the file where order schema is defined. When an user selects a product and moves to the "Complete the order" page, what are features the product should contain is defined here.
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
// const product = require("./product");
// const user = require("./user");

// We can define multiple schemas in one file. No restriction to it. But it is preferable to use only one
// By defining this schema, it will pull out the all the information of the product(product.js)
const productInCartSchema = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    quantity: Number,
    price: Number
})

const cartProduct = mongoose.model("cartProduct", productInCartSchema);

const orderSchema = new mongoose.Schema({
    products: [productInCartSchema],
    transaction_id :{},
    amount:{
        type: Number,
        required: true,
    },
    //Added by me. I will work upon it
    quantity:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        trim: true
    },
    //Added by me. I will work upon it
    promoCode:{
        type: Number
    },
    updated: {Date},
    // Cash On Delivery option. Added by me. Will work upon it.
    cod:{
        type: Boolean
    },
    status:{
        type: String,
        default: "Ordered",
        // enum is used for providing some default messages. Excluding these message other messages shouldn't be displayed
        enum: ["Ordered", "Received", "Shipped", "Out for delivery", "Delivered"]
    },
    user:{
        // Whenenever we are mentioning an "ObjectId", we have to mention a reference. Here the reference is for the user
        type: ObjectId,
        ref: "User"
    }
}, 
    {timeStamps: true}
);

const Order = mongoose.model("Order", orderSchema);
// This is syntax for exporting two schemas
module.exports = {Order, cartProduct};