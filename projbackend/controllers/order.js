// The order is fully dependent of the user. So through populate() method I have fetched the user all across through this controller file

// As I am exporting 2 things from the models, this is the syntax for it.
const {Order, cartProduct} = require("../models/order");

exports.getOrderById = (req,res,next, id) => {
    Order.findById(id)
    // The population occurs with the product from a range of products (products.product) followed by the field which conatins parameters that are the information you want to grab. here name and price
    // Will be much clear after I moving on to the frontend
    .populate("products.product", "name price")
    .exec((err, order) =>{
        if(err){
            return res.status(400).json({
                error: "Unable to fetch the order id"
            })
            // The order is self populated
        req.order = order;
        }
    })
    next();
}

exports.createOrder = (req,res) =>{
    // Setting the value of the user from /models/order/(user method) to the value that comes from the  the middlewire "getUserById" by population
    req.body.order.user = req.profile;
    // creating the object order
    const order = new Order(req.body.order);
    order.save((err, order) =>{
        if(err){
            return res.status(400).json({
                error: "Failed to save the order in DB"
            })
        }
        res.json(order);
    })
}

exports.getAllOrders = (req, res) =>{
    Order.find()
    // Again same syntax of population. Fetching the datas (name and id ) from the models/user
    .populate("user", "_id name")
    .exec(
        (err, allOrders)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to fetch all the orders from DB"
            })
        }
        res.json(allOrders);
    })
}

exports.getOrderStatus = (req,res) =>{
    // Imported from models/order/orderSchema/stats/enum
    res.json(Order.schema.path("status").enumValues)
}

exports.updateOrderStatus = (req,res) =>{
    // OMG!!! Now only I know that there is an update method also there. How sad !!!
    Order.update(
        // id is coming from frontend
        {_id: req.body.orderId},
        // I am setting the status which will come from frontend
        {$set: {status: req.body.status}},
        (err, updatedOrder)=>{
            if(err){
                return res.status(400).json({
                    error: "Unable to update the order status"
                })
            }
            res.json(updatedOrder);
        }
    )
}