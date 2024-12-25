import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { userContext } from "../../context/userContext";
// import style from './Register.module.css'
export default function Register() {
  let {setUserLogin} = useContext(userContext)
let [error,seterror] = useState('')
let [isLoading,setisLoading] = useState(false)
  let navigate = useNavigate()
  let schema = Yup.object().shape({
    name: Yup.string().min(3, 'min length is 3').max(10, 'max length is 10').required('name is required'),
        email : Yup.string().email('email is invalid').required('email is required'),
        phone :  Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'must be an Egyptian number')
      .required('phone is required'),
        password : Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{6,10}$/, 'must have at least one uppercase letter, one lowercase letter, and one number, with a length of 6 to 10 characters').required('password is required'),
        rePassword : Yup.string().oneOf([Yup.ref('password')],'repssword must match password').required('rePassword is required'),

  })

  function handleRegister(formValues) {   
    setisLoading(true) 
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues).then((response) => {
      localStorage.setItem('userToken', response.data.token)
      setUserLogin(response.data.token)
       navigate('/login')
    setisLoading(false)
     }).catch((apiResponse) => {
       setisLoading(false)
       seterror(apiResponse?.response?.data?.message)
  })
  }
  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema : schema ,
    onSubmit: handleRegister
  })

  return (
    <>

      <div className="">
        
        <h2 className="text-3xl font-bold my-6 text-green-700 text-center " ><i className="fa-regular fa-user mr-2"></i><span>Register Now</span></h2>
</div>
      <div className='w-[60%] mx-auto mt-15'>
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex flex-wrap">
            <div className="col-md-8 m-auto bg-gray-100  shadow-lg rounded-1 w-full p-5">
              <div className=" flex flex-wrap flex-col gy-2">
                <div className="col-md-12 ">
                     <label htmlFor="name"className="block my-1 text-sm font-medium text-gray-900 focus:outline-none ">Name</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="form-control w-full" placeholder="Enter Your Name" required />
   <p>          {formik.errors.name && formik.touched.name ?<p className="text-red-600  text-xs my-1 "> *{formik.errors.name}</p>: null}
</p>
   
                </div>
                <div className="col-md-12 ">
       <label htmlFor="email"className="block my-2 text-sm font-medium text-gray-900  ">Email</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="form-control w-full p-1" placeholder="Email Address" required />
   <p>             {formik.errors.email && formik.touched.email  ?<p className="text-red-600  text-xs my-1  "> *{formik.errors.email}</p> : null}

</p>
          </div>
                <div className="col-md-12 ">
       <label htmlFor="password" className="block my-2 text-sm font-medium text-gray-900 ">Password</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="form-control w-full " placeholder="Password" required />
   <p>           {formik.errors.password && formik.touched.password ?<p className="text-red-600  text-xs my-1"> *{formik.errors.password}</p> : null}
</p>
   
                </div>
                <div className="col-md-12 ">
        <label htmlFor="rePassword" className="block my-2 text-sm font-medium text-gray-900 ">password</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="form-control w-full " placeholder="Confirm Password" required />
   <p>       {formik.errors.rePassword && formik.touched.rePassword  ?<p className="text-red-600  text-xs my-1  "> *{formik.errors.rePassword}</p> : null}
</p>
   
                </div>
                <div className="col-md-12 ">
       <label htmlFor="phone" className="block my-2 text-sm font-medium text-gray-900 ">Phone</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="phone" name="phone" id="phone" className="form-control w-full " placeholder="Enter Your Phone" required />
   <p>        {formik.errors.phone && formik.touched.phone ? <p className="text-red-600 text-xs my-1 "> *{formik.errors.phone}</p> : null}
</p>
   
                </div>
                <p>
                
     {
          error ? <div className="py-2 my-2 text-sm text-red-600 rounded-lg text-center ">
          {error}
          </div> :null
        }
                </p>  

                  <div className="col-md-6 ">
 
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 mt-4 text-center  ">
           
            {isLoading? <i className="fas fa-spinner fa-spin"></i> : 'Register'}
                  </button>
                  <Link  to={'/login'}><p className="mt-2 hover:text-green-500">Already have account?</p></Link>
                </div>

                </div>
              </div>
            </div>
  
</form>
</div>


      
      </>
  )
}
