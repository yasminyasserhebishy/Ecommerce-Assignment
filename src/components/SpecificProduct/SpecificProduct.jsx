import React, { useContext, useEffect, useState } from 'react'
import style from './SpecificProduct.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { WishListContext } from '../../context/WishListContext';
import { CartContext } from '../../context/CartContext';


export default function SpecificProduct() {
  let [productDetail, setProductDetail] = useState(null)
  let [relatedProduct, setRelatedProduct] = useState([])
   const [currentProductId, setCurrentProductId] = useState(0)
     const [wishListProductId, setwishListProductId] = useState(0);
  let { addProductToCart, setCartNumber } = useContext(CartContext);
 let { addProductToWishlist , setWhishListNumber} = useContext(WishListContext);
  let { id, category } = useParams()
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
  function getSpecificProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data}) => {
     
      
    setProductDetail(data.data)
     
    }).catch(() => {
     
   })
 }
  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data}) => {
      let allProducts = data.data
   let matchCategory  =  allProducts.filter((product)=>  product.category.name == category )
        
      setRelatedProduct(matchCategory)
      console.log(matchCategory);
      
      }).catch((error) => {
     console.log(error);
     
   })
 }
  useEffect(() => {
    getSpecificProduct(id) 
    getRelatedProducts(category)
},[id, category])
  return (
    <>
      <div className="flex">
        <div className="w-1/4">
                  <Slider {...settings}>
  {productDetail?.images.map((src)=> <img key={productDetail.id} className='w-full' src={src} alt={productDetail?.title} />)}
    </Slider>
       
        </div>
        <div className="w-3/4 p-6">
          <h1 className='text-lg font-normal text-gray-950'>{productDetail?.title}</h1>
          <p className='text-gray-600 font-light '>{productDetail?.description}</p>
           <div className="flex justify-between items-center my-4">
              <span>{productDetail?.price } EGP</span>
              <span>{productDetail?.ratingsAverage }<i className='fas fa-star text-yellow-300'></i></span>
          </div>
             <button onClick={() => addProduct(productDetail.id)} className='btn'>add to cart</button>
        </div>
      </div>
      <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
        {relatedProduct.map((product) =>
          <>
          <Link to={`/specificProduct/${product.id}/${product.category.name}`}>
          
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
       
          </Link>
</>
        )}
      </div>
    </>
  )
}

 