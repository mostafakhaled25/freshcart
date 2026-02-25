"use client"
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import { addToWish } from '@/wishlistAction/addToWish.action';
import { WishContext } from '@/context/WishlistContext';

export default function AddBtnWish({id} : {id:string}) {
  
  const [disabledHeart, setdisabledHeart] = useState(false);
  const { itemsWish, setitemsWish, wishlistIds, setWishlistIds } = useContext(WishContext)!;

  
  const isFav = wishlistIds.includes(id);

  async function addProductToWish(id:string) {
    setdisabledHeart(true);
    const res = await addToWish(id);
    
    if(res.status == "success"){
       toast.success(res.message, { duration : 3000, position : "top-center" });
       setitemsWish(itemsWish + 1);
       setWishlistIds((prev) => [...prev, id]);
    } else {
       toast.error("You should be logged in first", { duration : 3000, position : "top-center" });
    }
    setdisabledHeart(false);
  }

  return (
    <div>
      <button 
        disabled={disabledHeart || isFav} 
        onClick={() => addProductToWish(id)}
      > 
        <i className={`${isFav ? "fa-solid text-red-600" : "fa-regular text-slate-500"} fa-heart text-3xl cursor-pointer transition-all duration-300 hover:scale-130`}></i>
      </button>
    </div>
  )
}