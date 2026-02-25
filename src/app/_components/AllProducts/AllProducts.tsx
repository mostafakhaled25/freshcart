
import { getAllProducts } from '@/api/allProducts.api'
import React from 'react'
import SingleProduct from '../SingleProduct/SingleProduct'
import { Product } from './../../../types/Product.type';

export default async function AllProducts() {
  

    const x = await getAllProducts()

   
  return <>
    
    <div className="container w-[90%] mx-auto my-12">

       <div className="flex flex-wrap">
         {x?.map((prod : Product)=>{
      return <SingleProduct product = {prod} key={prod.id}/>
    })}
       </div>
    </div>

  
  </>
}
