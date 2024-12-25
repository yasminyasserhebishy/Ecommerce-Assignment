

import { Link } from "react-router-dom"
import useProducts from "../../Hooks/useProducts"
import Loading from "../loading/loading"
import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { WishListContext } from "../../context/WishListContext"
import toast from "react-hot-toast"

// import style from './Products.module.css'

export default function Products() {
  let { data, isError, isFetching, isLoading, error } = useProducts()
  const [currentProductId, setCurrentProductId] = useState(0)
  const [wishListProductId, setwishListProductId] = useState(0);
  let { addProductToCart } = useContext(CartContext);
  let { addProductToWishlist, setWhishListNumber } = useContext(WishListContext);
    let {setCartNumber} = useContext(CartContext);
  async function addProduct(productId) {
    setCurrentProductId(productId)

    let response = await addProductToCart(productId)
    if (response.data.status === 'success') {
      setCartNumber( response.data.numOfCartItems)
      toast.success(response.data.message, {
     duration: 1000,
     position :'bottom-left'
     
   })
    } else {
    
 toast.error(response.data.message,{
     duration: 1000,
     position :'bottom-left'
     
   }) 
    }
  }
  async function addToWhishList(productId) {
    setwishListProductId(productId)
  
    let response = await addProductToWishlist(productId)
    if (response.data.status === 'success') {
      setWhishListNumber(response.data.data.length)
      toast.success(response.data.message, {
     duration: 1000,
     position :'bottom-left'
     
   })
    } else {
     
 toast.error(response.data.message,{
     duration: 1000,
     position :'bottom-left'
     
   }) 
    }
  }
  if (isLoading) {
    return <div className='py-8 w-full flex justify-center'><Loading /></div>
  }
  
  if (isError) {
    return <div className='py-8 w-full flex justify-center'><h3>{ error}</h3></div>
  }
  
  return (
    <>
      
       <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {data?.data.data.map((product) => 
                   <div key={product.id} className="group/card card rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
               <img className='w-full' src={product.imageCover} alt={product.title} />
                <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 gap-4 absolute w-full h-full bg-slate-400 left-0 top-0 flex justify-center items-center bg-opacity-40 opacity-0">
                    <div className="icon cursor-pointer w-8 h-8 rounded-full bg-green-600 text-white flex justify-center items-center">
                        <button onClick={()=>addToWhishList(product.id)}>
              
       <i className='fa-solid fa-heart '></i>
                            </button>
                  </div>
                    <div className="icon cursor-pointer w-8 h-8 rounded-full bg-green-600 text-white flex justify-center items-center">
                       <button onClick={() => addProduct(product.id)}>                  
        <i className='fa-solid fa-cart-shopping '></i>
                            </button>
                  </div>
            <Link to={`/specificProduct/${product.id}/${product.category.name}`}>
                  <div className="icon cursor-pointer w-8 h-8 rounded-full bg-green-600 text-white flex justify-center items-center">
                      <i className='fa-solid fa-eye '></i>
                  </div>
                 </Link>
              </div>
      
              </div>
              <div className="card-body p-4 space-y-3">
                <header>
                  <h3 className='text-lg text-gray-600 font-semibold'>{product.name}</h3>
                  <h4 className='text-green-500 font-semibold'>{product.category.name}</h4>
                </header>
                <p className='text-gray-400 text-sm line-clamp-2'>{product.title.split(' ').splice(0,2).join(' ')}</p>
                <div className="flex items-center justify-between">
                  <span>{product.price } EGP</span>
                  <div className="">
                    <i className='fas fa-star mr-1 text-yellow-500'></i>
      
                  <span></span>
                  </div>
                </div>
              </div>
      </div>
              )}
              </div>
         
    
   
     
      
      </>
  )
}

