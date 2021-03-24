// File Info : This helps in adding the functionalty to the Cart.js which are adding, loading and removing the product

// This will help in adding the item into the cart i.e. add functionality to the AddToCart button
export const addItemToCart = (item, next) =>{
    // An array
    let cart = [];
    // IF the object is not undefined
    if (typeof window !== undefined) {
        // If there is any existing cart give me that
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        // push all the items into the array "cart"
        cart.push({
            ...item,
            count : 1
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

// For loading all the products in the cart
export const loadCart = () =>{
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

// This method will help to remove the product from the cart
export const removeItemFromCart = (productId) =>{
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        // We are going to loop through the cart
        cart.map((product,index) =>{
            // If the saved product._Id (from the backend I think ) matches with the given productId then remove it
            if (product._id === productId) {
                // splice is an usal JavaScript method
                cart.splice(index, 1)
            }
        })
        // After removing the item update the cart again
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
}

// This method will make the cart empty after the successfull payment
export const emptyCart = next =>{
    if (typeof window !== undefined) {
        localStorage.removeItem("cart")
        next();
    }
}