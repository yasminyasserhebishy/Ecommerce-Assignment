
import amazon from '../../assets/images/amazon-pay.png'
import express from '../../assets/images/American-Express-Color.png'
import master from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'
import applestore from '../../assets/images/get-apple-store.png'
import googleplay from '../../assets/images/get-google-play.png'
export default function Footer() {
  return (
    <>
      <footer className='bg-slate-100 py-8'>
<div className="container space-y-4">
        <header>
           <h2 className='text-xl font-semibold text-slate-800'>Get The FreshCart App</h2>
        <p className='text-slate-400'>We will send you a link, open it on your phone to download the app</p>
        </header>
        <div className="flex gap-2">
            <input type="email" placeholder="email" className="form-control grow" />
            <button className="btn uppercase bg-green-600 hover:bg-green-800 text-white font-semibold text-sm">Share app link</button>
        </div>
        <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
           <div className="Payment-Partners flex gap-3 items-center">
              <h2 className="">Payment Partners</h2>
          <img src={amazon} alt="" className="w-20" />
              <img src={master} alt="" className="w-16" />
           <img src={express} alt="" className="w-20" />
             <img src={paypal} alt="" className="w-20" />
            
            </div>
           <div className="download flex gap-3 items-center">
            <h2 className="">Get deliveries with FreshCart</h2>
             <img src={applestore} alt="" className="w-20" />
               <img src={googleplay} alt="" className="w-[126px]" />
            </div>
        </div>
      </div>
      </footer>
 </>)
}
