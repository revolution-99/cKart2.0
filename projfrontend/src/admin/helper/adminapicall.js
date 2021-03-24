// API means  http://localhost:3000/api/ and as our backend part is running in port 3000, it will fetch all the datas of the backend
import { API } from "../../backend"

// Category calls
// method, headers, body are the same things, we have dealed in postman
export const createCategory = (userId, token, category) =>{
    // This is the same route mentioned in our backend in routes/category.js for creating the category
    return fetch (`${API}/category/create/${userId}`, {
        // Already mentioned in details in auth/helper/index.js 
        method: 'POST',
        headers :{
            Accept : 'application/json',
        // Same as the postman. The same thing as I am passing the bearer token in the header file in postman. There I am doing manually, here it will be fetched automatically from the backend by API 
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch( err => console.log(err))
}

// get all categories
export const getAllCategories = () =>{
    return fetch (`${API}/categories`, {
        // As it is a public route, hence no need to mention the headers and body part
         method : "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// Product calls

// Create a product
export const createProduct = (userId, token, product) =>{
    return fetch (`${API}/product/create/${userId}`,
    {
        method : "POST",
        headers :{
            Accept : "application/json",
            Authorization : `Bearer ${token}`,
        },
        body : product
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

// Read or fetches all products
export const getAllProducts = () =>{
    return fetch (`${API}/products`, {
         method : "GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// Get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

// Update a product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Delete a Product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };