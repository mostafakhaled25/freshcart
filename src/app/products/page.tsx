import React from 'react'
import { getAllProducts } from '@/api/allProducts.api';
import SingleProduct from '../_components/SingleProduct/SingleProduct';
import { Product } from '@/types/Product.type';

export default async function Products() {

  const data = await getAllProducts()
 
   console.log(data);
   

  return (
    
    <>
       <div className="container w-[90%] mx-auto">
        <div className="flex flex-wrap">
            {data?.map((prod :Product)=>{
       return <SingleProduct product={prod} key={prod.id}/>
       })}
        </div>
       </div>
    
    
    </>

  )
}
 