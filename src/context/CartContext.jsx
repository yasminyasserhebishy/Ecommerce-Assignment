import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {
         let headers = {
        token : localStorage.getItem('userToken')
    }
    const [cartNumber, setCartNumber] = useState(0)
    const [cartId, setCartId] = useState(null);


   async function payByCash(cartId, shippingAddress) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress },
      {
        headers
      }
    )
    .then((data) => data
    )
    .catch((err) => err.message);
}
    async function online(cartId, shippingAddress) {
         const formattedShippingAddress = {
    details: String(shippingAddress.details || ''),
    phone: String(shippingAddress.phone || ''),
    city: String(shippingAddress.city || ''),
  };
        
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`,
      { shippingAddress:formattedShippingAddress },
      {
        headers
      }
    )
    .then((data) =>   data
    
    )
      .catch((err) =>   err
      
  );
}
    function getLoggedUserCart() {
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        
      }).then((res) => {
          if (res.status === 200) {
              let cartNum = res.data.numOfCartItems;
              if (cartNum === 0) {
                  cartNum = "";
              }
              setCartId(res.data.cartId);
              setCartNumber(cartNum);
            }
            return res
      }
        ).catch((error) => 
            error
        )
    }
      function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
    });
  }
    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId 
        }, {
            headers
        }).then((res) => 
            
         res      
        ).catch((error) => 
            error
        )
        
    }
    function updateCartItemCount(productId,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count 
        }, {
            headers
        }).then((res) => 
            res            
        ).catch((error) => 
            error
        )
        
    }
    function removeFromCart(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((res) => 
            res     
        ).catch((error) => 
            error
        )
        
    }



    return <CartContext.Provider value={{getLoggedUserCart,addProductToCart,updateCartItemCount,removeFromCart,payByCash,clearCart,cartNumber, setCartNumber,setCartId,cartId,online}}>
{props.children}
    </CartContext.Provider>
}