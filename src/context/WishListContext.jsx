import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext()

export default function WishListContextProvider(props) {
         const [whisListNumber, setWhishListNumber] = useState(0)
    
    let headers = {
        token: localStorage.getItem('userToken')
    }

  async function getLoggedUserWhishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers
      })
      .then((res) => {
        if (res.data.data.length) {
          let wishNum = res.data.data.length;
          if (wishNum === 0) {
            wishNum = "";
          }
          setWhishListNumber(wishNum);
        }
        return res;
      })
      .catch((err) => err);
  }

 function addProductToWishlist(productId) {
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId
        }, {
            headers
        }).then((res) => 
            
       
           res
        

        ).catch((error) =>
            error
        )
    
    }
  function removeFromWhishlist(productId) {
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((res) => 
            res
                       
        ).catch((error) => 
            error
        )
        
    }
     return <WishListContext.Provider value={{addProductToWishlist ,getLoggedUserWhishlist ,removeFromWhishlist,whisListNumber, setWhishListNumber}}>
    {props.children}
        </WishListContext.Provider>
  
}