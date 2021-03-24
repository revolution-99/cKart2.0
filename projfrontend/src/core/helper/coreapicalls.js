import {API} from "../../backend"

// Just to use fetch all the products from the backend
export const getAllProducts = () =>{
    return fetch (`${API}/products`, {method: "GET"})
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}