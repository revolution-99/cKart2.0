import {API} from "../../backend"

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "appllication/json",
            Authorization : `Bearer ${token}`
        },
        // As projbackend/controllers/order/createOrder returns a JSON response, we have to convert it into a JSON file
        body : JSON.stringify({order : orderData})
    })
    .then(response =>{
        return response.json()
    })
    .catch( err => console.log(err))
}