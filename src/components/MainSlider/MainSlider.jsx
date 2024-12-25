import  { useEffect} from 'react'
import style from './MainSlider.module.css'
import firstPhoto from '../../assets/images/slider-image-3.jpeg'
import secondPhoto from '../../assets/images/slider-image-2.jpeg'
import thirdPhoto from '../../assets/images/slider-image-1.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
export default function MainSlider() {

    useEffect(() => {
      
    }, []);
  return (
    <>
      <section className='grid grid-cols-12 mb-8'>
        <div className="col-span-8">
          <Swiper className='h-full object-cover' loop={true}>
            <SwiperSlide> <img src={firstPhoto} className=' h-full object-cover' /></SwiperSlide>
            <SwiperSlide> <img src={firstPhoto} className=' h-full object-cover' /></SwiperSlide>
            <SwiperSlide> <img src={firstPhoto} className=' h-full object-cover' /></SwiperSlide>
          </Swiper>
          
        </div>
        <div className="col-span-4">
          <img src={secondPhoto} className='' />
                  <img src={thirdPhoto}className=''/>
        </div>
      </section>
      </>
  )
}
