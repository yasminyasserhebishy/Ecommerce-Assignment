import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../loading/loading';
import { createContext } from 'react';
import { userContext } from '../../context/userContext';
import {jwtDecode} from 'jwt-decode'
import { Link } from 'react-router-dom';



export default function Allorders() {
  const[allOrders, setAllorders] = useState([]);
  const[isLoading, setLoading] = useState(true)
  let token = localStorage.getItem('userToken')
  let payload = jwtDecode(token)
 async function getUserOrders() {
    
    if(payload) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${payload.id}`)
      .then((res)=> {
        console.log(res.data)
        setAllorders(res.data);
        setLoading(false);
      })
      .catch((err)=> err)
    }

  }
  useEffect(()=>{
    (async()=> {
    await getUserOrders();
    })()
  }, [])

  
  return (
    <>
      
      {
        allOrders?    <section className='space-y-4'>
          {allOrders?.map((order) => <>
        
       <div key={order.id} className="order p-4 border-2 border-gray-400 border-opacity-30 rounded-lg">
          <header className='flex justify-between items-center'>
            <div className="">
                  <h2 className='text-gray-500'>Order ID</h2>
              <span className='text-lg font-semibold text-gray-700'>#{order.id}</span>
            </div>
                <div className="">
                  {order?.isPaid ? <span className='inline-block px-3 py-1 bg-green-400 text-white font-semibold rounded-full mr-2'>paid</span> :
                  
              <span className='inline-block px-3 py-1 bg-red-400 text-white font-semibold rounded-full mr-2'>not paid</span>
                  }
                  {order?.isDelivered
 ? <span className='inline-block px-3 py-1 bg-green-400 text-white font-semibold rounded-full'>delivered</span> :
                  
              <span className='inline-block px-3 py-1 bg-green-400 text-white font-semibold rounded-full'>not delivered</span>
                  }

            </div>
          </header>
          <div className="grid mt-4 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {order.cartItems.map((item) => <>
                  <div key={item._id} className="product-item overflow-hidden border-2 border-gray-400 border-opacity-30 rounded-lg">
              <img src={item?.product?.imageCover} alt="" className='w-full' />
                    <div className="p-4">
                      <h3 className='text-lg font-semibold line-clamp-2'>
                        <Link to={`/specificProduct/${item.product.id}/${item.product.category.name}`}>
                                   {item?.product?.title}
                        </Link>
                      </h3>
              <div className="flex justify-between items-center mt-2">
                      <p><span className='font-bold underline'> count</span> { item?.count}</p>
                      <span>{item?.price}</span>
              </div>
         </div>
            </div>
                </>)}
              </div>
              
              <p className='text-lg mt-4'>Your Total Order Price is : <span className='mx-1 font-bold text-green-600'>{ order.totalOrderPrice}</span> L.E</p>
        </div>
        </>
      )}
</section> : <Loading/>
   }

      </>
)
}


