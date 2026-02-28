"use client"
import React, { useContext, useState } from 'react' // ضفنا useState
import { Button } from '@/components/ui/button';
import { addToCart } from '@/CartActions/addToCart.action';
import { toast } from 'sonner';
import { CartContext } from '@/context/CartContext';

export default function AddBtn({id} : {id:string}) {
   const {countCart , setCountCart} = useContext(CartContext)!
   const [isSubmitting, setIsSubmitting] = useState(false);

   async function addProductTocart(id:string) {
     setIsSubmitting(true); 
     const res = await addToCart(id);
     
     if(res.status == "success"){
        setCountCart(countCart + 1);
         setIsSubmitting(false);   
        toast.success(res.message , {
           duration : 3000 , 
           position : "top-center"
        });
     } else {
        toast.error("You should be logged in first" , {
           duration : 3000 , 
           position : "top-center"
        });
         setIsSubmitting(false);   
     }
    
   }

  return (
    <div>
      <Button 
        disabled={isSubmitting}     
        onClick={() => addProductTocart(id)} 
        className="cursor-pointer w-full py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all text-lg"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">Adding.....</span>
          </span>
        ) : (
          "Add To Cart"
        )}
      </Button>
    </div>
  )
}
