import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function CheckOut() {
      const navigate = useNavigate(); 
    let [orderDetails, setorderDetails] = useState(null)
    let [paymentMethod, setpaymentMethod] = useState(null)
    const [isloading, setIsLoading] = useState(false);
      let {  payByCash , cartId ,online } = useContext(CartContext)
    
    async function handleCart(formValues) {       
        let orderResponse = await payByCash(cartId, formValues)       
  setorderDetails(orderResponse.data.data)
  navigate('/orders')  
     setIsLoading(false)
  }
  async function onlinePayment(formValues) {   
      let {data} = await online(cartId, formValues)  

      if (data.status == 'success') {
        toast.loading('redirecting you to stripe')
        setTimeout(() => {
          
          location.href = data.session.url
        },2000)
      }

  }

  let schema = Yup.object().shape({
   
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'must be an Egyptian number')
      .required('phone is required'),
    city: Yup.string().min(4, 'must be more than 3 characters').max(20, 'must be less than 20 characters').required('city is required'),
    details: Yup.string().min(3, 'must be more than 10 characters').max(200, 'must be less than 100 characters').required('details is required')

  })

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        city: '',
        phone: '',
        details: ''
      }
    },
    validationSchema : schema ,
    onSubmit: (values) => {
      if (paymentMethod === 'cash') {
        handleCart(values)
      } else {
        onlinePayment(values)
      }
    }
  })

  return (<>
           <h2 className="text-3xl font-bold mb-6 text-green-700 text-center" ><i className="fa-regular fa-user mr-2"></i><span>Check Out</span></h2>
      <div className='bg-gray-100 border-1 border-gray-200 rounded-md'>
               <form onSubmit={formik.handleSubmit}>
          <div className=" flex flex-wrap">
            <div className="col-md-8 m-auto bg-gray-100  shadow-lg rounded-1 w-full p-5">
              <div className=" flex flex-wrap flex-col gy-2">
           
                <div className="col-md-12 ">
       <label htmlFor="city"className="block my-2 text-sm font-medium text-gray-900  ">city</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="form-control w-full p-1" placeholder="Enter your city name" required />
   <p>             {formik.errors.city && formik.touched.city  ?<p className="text-red-600  text-xs my-1  "> *{formik.errors.city}</p> : null}

</p>
          </div>
                <div className="col-md-12 ">
       <label htmlFor="phone"className="block my-2 text-sm font-medium text-gray-900  ">phone</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="form-control w-full p-1" placeholder="Enter your phone" required />
   <p>             {formik.errors.phone && formik.touched.phone  ?<p className="text-red-600  text-xs my-1  "> *{formik.errors.phone}</p> : null}

</p>
          </div>
                <div className="col-md-12 ">
       <label htmlFor="details" className="block my-2 text-sm font-medium text-gray-900 ">details</label>
    <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="message" name="details" id="details" className="form-control w-full " placeholder="Details" required />
   <p>           {formik.errors.details && formik.touched.details ?<p className="text-red-600  text-xs my-1"> *{formik.errors.details}</p> : null}
</p>
   
                </div>
                  <div className=" flex justify-center items-center gap-10 mt-6 ">

                              <div className="">
                                  
  <button onClick={()=> setpaymentMethod('cash')} type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <i className="fa-solid fa-wallet mr-2 text-lg"></i>
            {isloading? <i className="fas fa-spinner fa-spin"></i> : 'cash order'}
          </button>
               </div>
                              <div className="">
                                  
  <button onClick={()=> setpaymentMethod('online')} type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                     
                                      <i className="fa-solid fa-credit-card  mr-2 text-lg"></i>
            {isloading? <i className="fas fa-spinner fa-spin"></i> : 'online order'}
          </button>
               </div>
        
                </div>

                </div>
              </div>
            </div>
  
</form> 
    
      </div>
      </>
  )
}
