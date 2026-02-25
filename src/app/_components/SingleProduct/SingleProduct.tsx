"use client"

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from 'next/link'
import Image from 'next/image'
import { Product } from './../../../types/Product.type';
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import AddBtn from './../AddBtn/AddBtn';
import AddBtnWish from '../AddBtnWish/ِِِِِ AddBtnWish'



export default function SingleProduct({product} : {product : Product}) {

  const { data: session} = useSession()



 function appearToast(){
  if (!session) {
    toast.warning("Please Login To Continue", {
      duration: 3000,
      position: "top-center"
    })
  }
}
  return (
   
   
   <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 ' key={product.id}>
        <div className="p-2">
           <Card className='p-2 dark:bg-slate-800 '>
        <Link onClick={appearToast} href={`/products/${product.id}`}>
    <CardHeader>
    <CardTitle><Image loading="eager"  width={500} height={500} src={product?.imageCover} alt="" /></CardTitle>
  <div className='flex justify-between mt-1'>
      <CardDescription className='font-semibold text-emerald-600'>{product?.category.name}</CardDescription>
       <span><i className='fa fa-star text-amber-400'></i> {product.ratingsAverage}</span>
  </div>
  </CardHeader>
  <CardContent>
    <p className='font-bold text-xl line-clamp-1'>{product?.title}</p>
    
  </CardContent>
  </Link>
  <CardFooter>
    <div className='w-full flex justify-between lg:mt-1'>
      <span className='font-medium'>{product.price} EGP</span>
      <AddBtnWish id={product.id}/>
    </div>
  </CardFooter>
  
   
  <AddBtn id={product.id}/>
 
  
</Card>
        </div>
    </div> 
  )
}
