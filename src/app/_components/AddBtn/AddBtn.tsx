"use client"
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button';
import { addToCart } from '@/CartActions/addToCart.action';
import { toast } from 'sonner';
import { CartContext } from '@/context/CartContext';


export default function AddBtn({id} : {id:string}) {
  
   const {countCart , setCountCart} = useContext(CartContext)!



   async function addProductTocart(id:string) {
   const res = await addToCart(id)
     setCountCart(countCart + 1)

   
   
   if(res.status == "success"){
      toast.success(res.message , {
               duration : 3000 , 
               position : "top-center"
               
             })
   }else{
       toast.error(res.message , {
               duration : 3000 , 
               position : "top-center"
               
             })
   }
   
   }

  return (
    <div>
      <Button onClick={()=>addProductTocart(id)} className='bg-emerald-600 hover:bg-emerald-700 w-full cursor-pointer'>Add To Cart</Button>
    </div>
  )
}
