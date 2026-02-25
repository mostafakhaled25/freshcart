import { getSingleProduct } from '@/api/productDetails.api'
import AddBtn from '@/app/_components/AddBtn/AddBtn'
import AddBtnWish from '@/app/_components/AddBtnWish/ِِِِِ AddBtnWish'
import SingleProduct from '@/app/_components/SingleProduct/SingleProduct'
import { getRelatedProducts } from '@/productAction/relatedProduct.action'
import { Product } from '@/types/Product.type'
import Image from 'next/image'
import React from 'react'

export default async function ProductDetails({params} : {params : {id:string}}) {
 
    const {id} = await params
    
   const data = await getSingleProduct(id)

  

   if (!data) {
    return <h1>No Product Details</h1>
   }

   const res = await getRelatedProducts(data.category._id)
    
  return <>
  <div className="container w-[90%] mx-auto flex flex-col lg:flex-row my-10 lg:my-8" >
    <div className="w-full lg:w-1/4">
    <div className="p-2">
         <Image src={data.imageCover} className='w-full' alt="" />
    </div>
    </div>
     <div className="w-full lg:w-3/4">
    <div className="p-5">
       <div className='flex justify-between items-center py-4'>    <h3 className='text-2xl text-emerald-600'>{data.category.name}</h3> 
         <AddBtnWish id={data.id}/></div>
            <h2 className='text-3xl font-bold '>{data.title}</h2>
         <p className='text-gray-600 mt-2'>{data.description}</p>
   
            <div className='w-full flex justify-between mt-2'>
      <span className='font-semibold'>{data.price} EGP</span>
      <span><i className='fa fa-star text-amber-400'></i> {data.ratingsAverage}</span>
    </div>
    </div>
    <AddBtn id={data.id}/>
    
    </div>
  </div>
     

        <div className="container w-[90%] mx-auto my-12">

          <h2 className='text-3xl mb-6 font-bold '>Related Products</h2>
     
            <div className="flex flex-wrap">
              {res.data?.map((prod : Product)=>{
           return <SingleProduct product = {prod} key={prod.id}/>
         })}
            </div>
         </div>
  </>
}
