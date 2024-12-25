

import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/CartContext"
import Loading from "../loading/loading"

import { Link } from "react-router-dom";
import toast from "react-hot-toast"

export default function Cart() {
  let { getLoggedUserCart, updateCartItemCount, removeFromCart,clearCart, setCartNumber } = useContext(CartContext)
  let [cartOwner, setcartOwner] = useState(null)
   let [cartDetails, setCartDetails] = useState(null)
  const [isloading, setIsLoading] = useState(false);


  async function getItems() {
    let cartResponse = await getLoggedUserCart()
    setCartDetails(cartResponse.data.data)
     setCartNumber(cartResponse.data.numOfCartItems)
    setIsLoading(false)
    setcartOwner(cartResponse.data.data.cartOwner)
  }

   async function updateCartCount(productId,count) {
    let updateResponse = await updateCartItemCount(productId, count) 
     setCartDetails(updateResponse.data.data)
     console.log(updateResponse);
       setCartNumber(updateResponse.data.numOfCartItems)
  }
  async function removeItem(productId) {
    let removeRes = await removeFromCart(productId)
    console.log(removeRes);
    
    setCartDetails(removeRes.data.data)
    setCartNumber(removeRes.data.numOfCartItems)
  }
    async function clear() {
      await clearCart();
      setCartDetails([]);
      toast.error('Shopping Cart Empty');
       setCartNumber(0)
  }
  useEffect(() => {
    getItems()
  }, [])
     if (isloading) {
          return <Loading />
        }
  return <>
    
    <section>
  <div className="flex gap-8 items-center">
    <i className="fa-brands fa-opencart text-3xl"></i>
    <h2 className="text-xl text-slate-600 font-semibold pl-4 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
      Your Shopping Cart
    </h2>
  </div>

  {cartDetails?.products == null || cartDetails?.products?.length === 0 ? (
        <div className="bg-slate-100 m-4 text-center p-10">
          <h2 className="text-gray-800 text-xl font-semibold">Oops! your cart is empty. start shopping now by clicking the button below</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white rounded-md py-2 px-1 mt-4">
            <Link to={'/'}>
            Back to Home
            </Link></button>
    </div>
  ) : (
    <>
      <div className="space-y-4 mt-8">
        {cartDetails?.products?.map((product) => (
          <div key={product?.product?.id} className="flex gap-2">
            <div className="card-item grow bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center">
              <img
                src={product?.product?.imageCover}
                alt=""
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <h3 className="text-lg text-gray-700 font-semibold">{product?.product?.title}</h3>
              <h4 className="text-gray-500 font-semibold">{product?.product?.category?.name}</h4>
              <div className="count flex gap-3 justify-center items-center">
                <button
                  onClick={() => updateCartCount(product?.product?.id, product?.count - 1)}
                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-white bg-gray-600 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Quantity button</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <div>
                  <span>{product?.count}</span>
                </div>
                <button
                  onClick={() => updateCartCount(product?.product?.id, product?.count + 1)}
                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-white bg-gray-600 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Quantity button</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="{2}"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <span>{product?.price} L.E</span>
            </div>
            <button
              onClick={() => removeItem(product.product.id)}
              className="rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}

        {/* Total price and clear button */}
        {cartDetails?.products?.length > 0 && (
          <div className="mt-5 flex justify-between items-center">
            <p className="text-xl">
              <i className="fa-solid fa-dollar-sign text-xl mr-2 text-green-600"></i>
              Your Total Cart Price{" "}
              <span className="text-green-600 font-bold">{cartDetails?.totalCartPrice} L.E</span>
                  </p>
                  <Link to={'/checkOut'}>
                  
            <button
              className="btn bg-green-500 hover:bg-green-600 text-white"
            >
              <i className="fa-solid fa-shopping-cart mr-2"></i>
              Checkout
            </button>
                  </Link>
            <button
              onClick={clear}
              className="btn bg-red-500 hover:bg-red-600 text-white"
            >
              <i className="fa-solid fa-trash mr-2"></i>Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )}
</section>
    


  </>
}

