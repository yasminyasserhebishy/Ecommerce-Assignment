// import React, { useEffect, useState } from 'react'

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import style from './Category.module.css'

export default function Brand() {
   let[brands,setBrands]=useState([])
    function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then(({data}) => {
     
    setBrands(data.data)
     
    }).catch(() => {
     
   })
 }
    useEffect(() => {
      getBrands()
    }, []);
  return (
    <>
      <div className=" grid lg:grid-cols-6 sm:grid-cols-3 gap-2 px-2 pb-16 mt-4 ">
       
          {brands?.map((brand) =>
 <div key={brand._id}  >
              <Link to={`/specificbrand/${brand._id}/${brand.name}`}>
          <div className="rounded-full bg-black shadow-md hover:-translate-y-5 size-30 duration-700">
          <img className='w-full rounded-full' src={brand.image} alt={brand.name} />
          </div>  
           </Link>
        </div>

)}
     
        </div>

    </>
  )
}

