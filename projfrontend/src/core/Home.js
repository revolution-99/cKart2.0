import React, {useState, useEffect} from "react";
import "../styles.css";
// Fetching the .env file which is defined in backend.js
import { API } from "../backend";
// This is just the declaration of the base. You have to mention what you want to put in <Base></Base>
import  Base from "./Base";
import  Card  from "./Card";
import {getAllProducts} from "./helper/coreapicalls"

// Whenever we want to wrap something inside a block level we use <div></div>
// Whenever we want to wrap something inside a line level we use <span></span>

export default function Home() {

  // Previuosly done these things in useState method
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  // This is going to load all the products into the state and from the state we are going to map i.e. going to iterate
  const loadAllProducts = () =>{
    getAllProducts().then(data =>{
      if (data.error) {
        setError(data.error)
      }else{
        setProducts(data)
      }
    })
  }

  useEffect( () =>{
    loadAllProducts()
  }, [])

  return (
    <Base 
    title = "Home"
    description= "Welcome to cKart">
        <h1 className="text-white">Say hello to your new wearings !!!</h1>

      <div className="row text-center">
        <div className="row">
          {/* I have used "tees"  instead of product */}
          {/* using the "map" we are just fetching the things */}
          {products.map((tees, index) =>{
            return (
              // Key is a feature of the map
              <div key = {index} className="col-4 mb-4">
                {/* This will fetch all the products from the backend */}
                <Card product = {tees}/>
              </div>
            )
          })}
        </div>
      </div>
      
    </Base>
  );
}
