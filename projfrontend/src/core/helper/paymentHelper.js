import {API} from "../../backend"

// Similar to the getToken method of the backend/controllers/payment. Here we are fetching the exact path that of the backend
export const getMeToken = (userId, token) => {
    return fetch(`${API}/payment/gettoken/${userId}` ,{
        method  : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch (err => console.log(err))
}

// Similar to the checkout method of the backend/controllers/payment.
// "paymentInfo" will display the amount etc.
export const checkoutPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/payment/checkout/${userId}` ,{
        method  : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(paymentInfo)
    })
    .then(response => {
        return response.json()
    })
    .catch (err => console.log(err))
}