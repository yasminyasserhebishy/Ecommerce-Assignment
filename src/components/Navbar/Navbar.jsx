import { Link,NavLink } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/userContext'
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../context/CartContext';
import { WishListContext } from '../../context/WishListContext';
export default function Navbar() {
   const { cartNumber,getLoggedUserCart} = useContext(CartContext);
  const { whisListNumber, getLoggedUserWhishlist } = useContext(WishListContext);
 const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let navigate = useNavigate()
  let {userLogin , setUserLogin}= useContext(userContext)
  function logOut() {
    localStorage.removeItem('userToken')
     localStorage.removeItem('userId');
    setUserLogin(null)
    navigate('/login')
  }
  
  useEffect(()=>{
    (async ()=> {
      if(localStorage.getItem("userToken") !== null){
        await getLoggedUserCart()
        await getLoggedUserWhishlist();
      }
    }
    )()
  },[])
  return (
    <>
    
  <nav className="bg-slate-100 shadow-sm border-gray-200 fixed left-0 right-0 top-0 z-50 rounded-b-sm">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl container py-2">
        <div className="leftSide flex items-center gap-3">
          <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img width={130} src={logo} alt="fresh cart logo" />
          </Link>
          <ul className="hidden md:flex md:flex-row text-slate-400 ">
            {userLogin !== null ? (
              <>
                <li className="py-2 ">
                  <NavLink className="md:mx-1 lg:mx-2 text-sm text-slate-900" to="">Home</NavLink>
                </li>
                <li className="py-2">
                  <NavLink className="md:mx-1 lg:mx-2 text-sm text-slate-900" to="products">Products</NavLink>
                </li>
                <li className="py-2">
                  <NavLink className="md:mx-1 lg:mx-2 text-sm text-slate-900" to="category">Category</NavLink>
                </li>
                <li className="py-2">
                  <NavLink className="md:mx-1 lg:mx-2 text-sm text-slate-900" to="brands">Brands</NavLink>
                </li>
                <li className="py-2">
                  <NavLink className="md:mx-1 lg:mx-2 text-sm text-slate-900" to="cart">Cart</NavLink>
                </li>
                <li className="py-2">
                  <NavLink className="md:mx-1 lg:mx-2 text-sm text-slate-900" to="orders">Orders</NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="flex items-center count-icon">

              {userLogin !== null ?  <ul className="flex items-center">
              <li>
                  <NavLink to={'wishList'}>
                    <div className="relative mr-3">
                    <i className='fa-solid fa-heart text-md text-green-600'></i>
                    <div className="rounded  absolute -top-3 -right-4 bg-green-600 ">
                        <span className='text-white'>{whisListNumber}</span>
                          </div>
                    </div>
                </NavLink>
              </li>
              <li>
                  <NavLink to={'cart'}>
                    <div className="relative mx-3 me-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-cart4 text-green-600 " viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                      </svg>
                      <div className="rounded  absolute -top-3 -right-4 bg-green-600 ">

                  <span className='text-white'>{cartNumber}</span>
                      </div>
                    </div>
                </NavLink>
              </li>
            </ul>: null}

            <ul className='flex items-center md:flex social-icons hidden md:block'>
              <li><Link to={'https://www.facebook.com'}><i className='fab fa-facebook me-1 md:ms-0 lg:ms-3'></i></Link></li>
              <li><Link to={'https://x.com/?lang=en'}><i className='fab fa-twitter mx-1'></i></Link></li>
              <li><Link to={'https://www.instagram.com/accounts/login/?hl=en'}><i className='fab fa-instagram mx-1'></i></Link></li>
              <li><Link to={'https://www.youtube.com/'}><i className='fab fa-youtube mx-1 md:me-0'></i></Link></li>
            </ul>
          </div>

          <ul className='hidden md:flex items-center'>
            {userLogin === null ? (
              <>
                <li className='py-2'>
                  <NavLink className='mx-2 text-xs text-slate-900' to='login'>Login</NavLink>
                </li>
                <li className='py-2'>
                  <NavLink className='mx-2 text-xs text-slate-900' to='register'>Register</NavLink>
                </li>
              </>
            ) : (
              <li onClick={logOut} className='py-2'>
                <span className='mx-2 text-xs text-slate-900 cursor-pointer hover:text-green-600 md:ms-0'>Logout</span>
              </li>
            )}
          </ul>

          <button onClick={toggleMenu} className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-navbar" aria-expanded={isOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col p-4 border-t border-gray-200 bg-gray-50">
            {userLogin !== null ? (
              <>
                <li><NavLink className="block py-2 text-slate-900" to="">Home</NavLink></li>
                <li><NavLink className="block py-2 text-slate-900" to="products">Products</NavLink></li>
                <li><NavLink className="block py-2 text-slate-900" to="category">Category</NavLink></li>
                <li><NavLink className="block py-2 text-slate-900" to="brands">Brands</NavLink></li>
                  <li><NavLink className="block py-2 text-slate-900" to="cart">Cart</NavLink></li>
                  <li onClick={logOut} className='py-2 cursor-pointer hover:text-green-600'>Logout</li>
                    <ul className='flex justify-around items-center md:flex social-icons'>
              <li><a href=""><i className='fab fa-facebook me-1 ms-3'></i></a></li>
              <li><a href=""><i className='fab fa-twitter mx-1'></i></a></li>
              <li><a href=""><i className='fab fa-instagram mx-1'></i></a></li>
              <li><a href=""><i className='fab fa-youtube mx-1'></i></a></li>
            </ul>
              </>
            ) : (
              <>
                <li><NavLink className="block py-2 text-slate-900" to="login">Login</NavLink></li>
                    <li><NavLink className="block py-2 text-slate-900" to="register">Register</NavLink></li>
                      <ul className='flex justify-around items-center md:flex social-icons'>
              <li><a href=""><i className='fab fa-facebook me-1 ms-3'></i></a></li>
              <li><a href=""><i className='fab fa-twitter mx-1'></i></a></li>
              <li><a href=""><i className='fab fa-instagram mx-1'></i></a></li>
              <li><a href=""><i className='fab fa-youtube mx-1'></i></a></li>
            </ul>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
      </>
  )
}

