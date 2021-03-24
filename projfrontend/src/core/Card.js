// This is the file for creating cards in the home page

import React, {useState, useEffect} from "react"
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import {Redirect} from "react-router-dom"

    const Card = ({
        product,
        // addToCart and removeFromCart is used for conditional rendering
        addToCart = true,
        removeFromCart = false,
        // As we want to make setReload unfunctional we have used the below syntax which means whatever we are sending we are getting back. This is a pretty new syntax, Below is a old school stuff of it.
        // function (f) {return f}
        setReload = f => f,
        reload = undefined
        }) => {
          
          // had done many times. That's how the useState kicks in
          const [redirect, setRedirect] = useState(false)


          

          //To count the no. of products. It can be seen in the console menu
          const [count, setCount] = useState(product.count)

          // Instead of typing again and again. Inorder to make the card reusable we have added folllowing methods so that whennver we want to reuse this we can use without any hustle
            const cartTitle = product ? product.name: "Poor network in loading the image"
            const cartDescription = product ? product.description: "Please refresh and try again"
            const cartPrice = product ? product.price: "Default price"

            // Makes a redirect to the cart page
            const getARedirect = (redirect) =>{
              if (redirect) {
                return <Redirect to = "/cart" />
              }
            }

            // Adds a product to the cart
            const addProductToCart = () =>{
              //  addItemToCart is fetched from from "./helper/cartHelper"
              // setRedirect is set to true i.e. it is get redirected
              addItemToCart(product, ()=> setRedirect(true))
            }

            const displayAddToCart = (addToCart) =>{
                return(
                    addToCart && (
                        <button
                        onClick={(addProductToCart) => {}}
                        className="btn btn-block btn-outline-success mt-2 mb-2"
                      >
                        Add to Cart
                      </button>
                    )
                )
            }
            const displayRemoveFromCart = (removeFromCart) =>{
                return(
                    removeFromCart && (
                  
                  <button
                    onClick={() => {
                      removeItemFromCart(product._id)
                      // Means that if reload is false setReload turns true
                      setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
                    )
                )
            }
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {/* Calling the getARedirect and passing the "redirect" from the useState*/}
                {getARedirect(redirect)}
                {/* As we are passing product as a parameter in ImageHelper mentionig it is must */}
             <ImageHelper product = {product}/>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">${cartPrice} </p>
              <div className="row">
                <div className="col-12">
                    {displayAddToCart(addToCart)}
                </div>
                <div className="col-12">
                    {displayRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };
      
export default Card;
