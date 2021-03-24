const express = require("express");
const router = express.Router();

const{getOrderById, createOrder, getAllOrders, getOrderStatus, updateOrderStatus} = require("../controllers/order");
const{isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const{getUserById, userPurchaseList} = require("../controllers/user");
const{updateProduct} = require("../controllers/product");

// params declared here
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual routes declared here
// This is the route for creating the order
// And again the order of defining the routes is important here
router.post("/order/create/:userId", isSignedIn, isAuthenticated, userPurchaseList, updateProduct, createOrder)

// This is the route for reading the route
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

// This is the route for tracking the order status by admin only
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)

// This is the route for updating the status of the order by the admin
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateOrderStatus)

module.exports = router;