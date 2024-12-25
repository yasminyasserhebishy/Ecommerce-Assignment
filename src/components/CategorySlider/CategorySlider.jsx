import  { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../loading/loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function CategorySlider() {
  let[categories,setCategories]=useState([])

    function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data}) => {
     
      
    setCategories(data.data)
     
    }).catch(() => {
     
   })
 }
    useEffect(() => {
      getCategories()
    }, []);
  return (
    <>
    
      <section className='my-8'>
        <h2 className='mb-5 text-lg text-green-700 font-bold'>Shope now by popular categories</h2>
          {!categories ? <Loading /> : <Swiper slidesPerView={6} loop={true}>
        {categories.map((category) =>
          <SwiperSlide key={category._id}>
            <div className="h-64">

            <img src={category.image} alt="" className='w-full h-full object-cover'/>
            </div>
            <h3 className='mt-2'>{category.name}</h3>
       </SwiperSlide> 
        )}

      </Swiper>
      }
      </section>

      </>
  )
}
