import { useFormik } from "formik";
import  { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


export default function ResetPassword() {
  let [error,seterror] = useState('')
let [isLoading,setisLoading] = useState(false)

  let navigate = useNavigate();

  const ForgotPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,}$/,
        "New Password must start with an uppercase letter and be at least 8 characters long"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  async function resetPassword(values) {
    setisLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((data) => {
        setisLoading(false);
        console.log(data);

        if (data.data.token) {
          navigate("/login");
        }
      })
      .catch((error) => {
        setisLoading(false);
        console.log(error.response);
        seterror(error.response.data.message);
      });
  }

  return (
    <>
      
           <div className="">
        
        <h2 className="text-3xl font-bold my-6 text-green-700 text-center " ><i className="fa-regular fa-user mr-2"></i><span>Create New password</span></h2>
</div>
      <div className='w-[60%] mx-auto mt-15'>
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex flex-wrap">
            <div className="col-md-8 m-auto bg-gray-100  shadow-lg rounded-1 w-full p-5">
              <div className=" flex flex-wrap flex-col gy-2">
           
                <div className="col-md-12 ">
       <label htmlFor="email"className="block my-2 text-sm font-medium text-gray-900  ">Email</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="form-control w-full p-1" placeholder="Email Address" required />
   <p>             {formik.errors.email && formik.touched.email  ?<p className="text-red-600  text-xs my-1  "> *{formik.errors.email}</p> : null}

</p>
          </div>
                <div className="col-md-12 ">
       <label htmlFor="newPassword"className="block my-2 text-sm font-medium text-gray-900  ">newPassword</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="form-control w-full p-1" placeholder="newPassword" required />
   <p>             {formik.errors.newPassword && formik.touched.newPassword  ?<p className="text-red-600  text-xs my-1  "> *{formik.errors.newPassword}</p> : null}

</p>
          </div>
            
                <p>
                
     {
          error ? <div className="py-2 my-2 text-sm text-red-600 rounded-lg text-center ">
          {error}
          </div> :null
        }
                </p>  

                  <div className="col-md-12 ">

            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 mt-4 text-center  ">
           
            {isLoading? <i className="fas fa-spinner fa-spin"></i> : 'Reset Password'}
                  </button>
             
                </div>

                </div>
              </div>
            </div>
  
</form>
</div>
  
    </>
  )
}