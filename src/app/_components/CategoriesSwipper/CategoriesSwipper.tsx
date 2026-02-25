"use client"
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Category } from './../../../types/Product.type';
import Image from 'next/image';

export default function CategoriesSwipper({categories} : {categories : Category[]}) {
  return <>
   <div className="container w-[85%] lg:w-[80%] mx-auto">
     <Swiper
      spaceBetween={0}
      slidesPerView={7}
      modules={[Autoplay]}
      autoplay = {{
        delay : 1000
      }}
      breakpoints={{
    0: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 6,
    },
  }}

    >
       {categories?.map((cat : Category)=>{
        return  <SwiperSlide key={cat._id}>
            <Image width={500} height={500} src={cat.image} className='w-full h-30  lg:h-37.5 object-cover' alt="" />
            <p>{cat.name}</p>
        </SwiperSlide>
       })}

     

    </Swiper>
   </div>
  
  </>
}
