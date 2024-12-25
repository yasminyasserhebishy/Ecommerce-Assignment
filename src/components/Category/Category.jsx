

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import style from './Category.module.css'

export default function Category() {
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
      <div className="container">
             <h2 className='py-4 text-gray-600 font-medium text-xl'>shop popular categories</h2>
      </div>
    
      <div className="grid lg:grid-cols-6  sm:grid-cols-3 gap-5">
          {categories?.map((category) =>
            <div key={category._id}  >
              <Link to={`/specificCategory/${category._id}/${category.name}`}>
          <div className="image shadow-md rounded-md hover:scale-105 duration-700">
          <img className='w-full category-img rounded-md' src={category.image} alt={category.name} />
          </div>  
          <h3 className='font-light mt-2 text-center'>{category.name}</h3>
           </Link>
        </div>
           )}
        </div>
       
      
    
     
    </>
  )
}
