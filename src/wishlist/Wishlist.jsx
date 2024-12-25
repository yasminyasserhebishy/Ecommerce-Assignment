

import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../context/WishListContext";
import toast from "react-hot-toast";
import Loading from "../components/loading/loading";

// import style from './Brand.module.css'

export default function Wishlist() {
      let { getLoggedUserWhishlist ,removeFromWhishlist, setWhishListNumber} = useContext(WishListContext)
    let [whishDetails, setwhishDetails] = useState(null)
     const [isloading, setIsLoading] = useState(true);
         
      async function getItems() {
        let whishListResponse = await getLoggedUserWhishlist()
        setIsLoading(false)
        setwhishDetails(whishListResponse.data.data)   
       setWhishListNumber(whishListResponse.data.count)
        

    }
    
    async function removeItem(productId) {
        let {data} = await removeFromWhishlist(productId)      
       if (data?.status === "success") {
      toast.error(data.message);
   
      let newList = whishDetails.filter((item) => item.id !== productId);
         setwhishDetails(newList);
       
         
          setWhishListNumber(newList.length)
    }
    }
    
        
    
    useEffect(() => {
        getItems()
    },[])
    
    if (isloading) {
        return <Loading />
      }
     
    return <>     
{whishDetails?.length ?
      <div className="relative overflow-x-auto sm:rounded-lg">
      <h2 className="text-3xl text-center text-green-600 py-5">Whishing List</h2>
  <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
        <tbody>
            {whishDetails?.map((product,index) =>        
              <tr key={product.id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.imageCover} alt={product.title} className="w-16 md:w-32 max-w-full max-h-full" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.title}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <span>{ product.price} EGP</span>
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>removeItem(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
                        </tr>
                    
          )}
    </tbody>
  </table>
            </div> :    <div className="cart container my-5 py-5  d-flex  align-items-center justify-content-center ">
      <div className="row ">
        <div className="col-md-7 mx-auto">
          <div className="w-100">
            <h4 className="my-4 text-center text-capitalize fw-bold">
             There are not products yet.
            </h4>
          </div>
        </div>
      </div>
            </div>
        }
   </>
}

