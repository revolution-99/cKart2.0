import {API} from "../../backend"
// API means  http://localhost:3000/api/

// Remember this method syntax. It is the usal React syntax

// Authentication method for signup
// signup takes the user as a parameter which will come from the frontend as json
export const signup = user =>{
    // through this API call backend part is fetched
    // '/signup' route is previously defined
    return fetch(`${API}/signup`, {
        method:"POST",
        headers:{
            // These are the same things what we mention during the testing in postman
            // NOTE: Accept don't have double quotes
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    // just like the normal try and catch block sanu!!!
    .then( response =>{
        // return whatever responses are coming from the frontend
        return response.json();
    })
    .catch( err =>{
        console.log(err)
    })
}

// Authentication method for signin
export const signin = user =>{
    return fetch(`${API}/signin`, {
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( response =>{
        return response.json();
    })
    .catch( err =>{
        console.log(err)
    })
}

// This method creates a jwt token which stores the information of signin, signup in the local storage
export const authenticate = (data, next) =>{
    // Means if the window object is accessable to us then access the local storage and set some jwt values to it.
    // setItem sets the value as key-value pair key : "jwt" and value : JSON.stringify(data)
    if(typeof window !== "undefined"){
        // This jwt token comes from the projbackend/controllers/auth.js/exports.signin
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

// Authentication method for signout route
export const signout = next =>{
    if(typeof window !== "undefined"){
        // I just want to remove the jwt token. I can simply do it by removing the key, I don't care about it's value
        localStorage.removeItem("jwt");
        next();

        return fetch(`&{API}/signout`, {
            method: "GET"
        })
        .then( response => console.log("You are signed out succeessfully."))
        .catch(err => console.log(err))
    }
}

// Method to validate the user is signed in or not
// This isAuthenticated() method pulls the jwt token from the backend. Therefore it give us access to use the models of backend directly fore e.g. : isAuthenticated().user.role fetches the user model in the backend and then access the role which is a user property of the backend 
export const isAuthenticated = () =>{
    // If the user is not able to get the access of window object then he is not authenticated i.e. not able to access the token bcz the token can only be generated when window is accessed

    if(typeof window == "undefined"){
        return false;
    }
    // If we are able to get the access of the token in local storage, instead of returing the true value, we are returning whatever the value of the key of the jwt token.
    // Then we are checking in the frontend if the user is same with the user we are looking up for by again passing the "localStorage.getItem". If it is correct then only we will return true otherwise false
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}
