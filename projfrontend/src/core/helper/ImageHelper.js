// This helper method is used to hit the path router.get("/product/photo/:productId", photo) from the backend

import React from "react"
// As we are fetching the routes from the backend thererfore API is called from the backend
import { API } from "../../backend";
const ImageHelper = ({product}) => {
    // If the product exists then load the photos from the backend uding the url metioned below otherwise load the other URL
    const imageUrl = product ? `${API}//product/photo/${product._Id}` : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    return(
        <div className="rounded border border-success p-2">
        <img
        // Fetching the photos from the backend route
          src={imageUrl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}

export default ImageHelper;