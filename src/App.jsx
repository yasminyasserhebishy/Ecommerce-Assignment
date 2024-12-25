import './App.css'
import Layout from './components/Layout/Layout'
import Notfound from './components/Notfound/Notfound'
import Brand from './components/Brand/Brand'
import Cart from './components/Cart/Cart'
import Category from './components/Category/Category'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './context/userContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import SpecificProduct from './components/SpecificProduct/SpecificProduct'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RecentProducts from './components/RecentProducts/RecentProducts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Products from './components/Products/Products'
import CartContextProvider from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import Wishlist from './wishlist/Wishlist'
import WishListContextProvider from './context/WishListContext'
import SpecificCategory from './components/specificCategory/SpecificCategory'
import ForgotPassword from './components/forgetpassword/ForgetPassword'
import VerifyCode from './components/verifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import SpecificBrand from './components/specificBrand/SpecificBrand'
import Allorders from './components/allOrders/AllOrders'
import CheckOut from './components/checkOut/CheckOut'


ReactQueryDevtools
function App() {
  let query = new QueryClient({
    defaultOptions: {
      
    }
})
  let x = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
    { path:'brands', element: <ProtectedRoute><Brand /> </ProtectedRoute>},
    { path:'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute>},
    { path:'category', element: <ProtectedRoute>< Category/></ProtectedRoute>},
    { path:'orders', element: <ProtectedRoute><Allorders/></ProtectedRoute>},
    { path:'checkOut', element: <ProtectedRoute><CheckOut/></ProtectedRoute>},
    { path:'specificProduct/:id/:category', element: <ProtectedRoute>< SpecificProduct/></ProtectedRoute>},
    { path:'specificCategory/:id/:category', element: <ProtectedRoute>< SpecificCategory/></ProtectedRoute>},
    { path:'specificbrand/:id/:brand', element: <ProtectedRoute><SpecificBrand/></ProtectedRoute>},
    { path: 'login', element: <Login/>},
    { path: 'forgetPassword', element: <ForgotPassword/>},
    { path: 'verifyCode', element: <VerifyCode/>},
    { path: 'resetPassword', element: <ResetPassword/>},
    { path: 'register', element: <Register/>},
    { path: 'RecentProducts', element: <ProtectedRoute><RecentProducts/> </ProtectedRoute>},
    { path: 'wishList', element: <ProtectedRoute><Wishlist/> </ProtectedRoute>},
    { path: 'products', element: <ProtectedRoute><Products/> </ProtectedRoute>},
    { path: '*', element:<Notfound/> }
    ]},
])
  return (
    < QueryClientProvider client={query}>
      <UserContextProvider> 
  <CartContextProvider>
        <WishListContextProvider>
  <RouterProvider router={x} />
          <ReactQueryDevtools />
          <Toaster></Toaster>
        </WishListContextProvider>
        </CartContextProvider>
    </UserContextProvider>
   </QueryClientProvider>
   
   
  )
}

export default App
