"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import img3 from "../../../../public/images/slider-image-1.jpeg"
import img4 from "../../../../public/images/slider-image-2.jpeg"
import img5 from "../../../../public/images/slider-image-3.jpeg"
import Image from 'next/image'
import { Autoplay } from 'swiper/modules';


export default function MainSlider() {
  return <>
  
  <div className="container w-[85%] lg:w-[80%] mx-auto my-6 flex">
   <div className="w-8/12 lg:w-3/4 ]">
   
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay = {{
        delay : 1000
      }}
      

    >
      <SwiperSlide> <Image priority src={img5} className="w-full object-center  " alt=""/></SwiperSlide>
      <SwiperSlide> <Image priority  src={img3} className="w-full object-center " alt=""/></SwiperSlide>
      <SwiperSlide> <Image priority  src={img4} className="w-full object-center " alt=""/></SwiperSlide>
     

    </Swiper>
  
   </div>
   <div className="w-6/12  ">
    <Image priority src={img5} className=" w-full object-center  " alt=""/>
   <Image priority src={img3} className="w-full object-center " alt=""/>
   <Image priority src={img4} className="hidden lg:block w-full object-center " alt=""/>
 
   </div>
  </div>
  
  </>
}
