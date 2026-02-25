"use server"

import { getMyToken } from "@/utilities/getMyToken";

export async function getUserWishList() {
  const token = await  getMyToken()
      if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist" , {

    method : "GET" , 
    headers : {
        token : token , 
        "Content-Type" : "Application/json"
    } 
  })

 
 const payload = res.json()

 return payload

}