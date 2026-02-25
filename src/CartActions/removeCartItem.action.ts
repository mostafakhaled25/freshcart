"use server"

import { getMyToken } from "@/utilities/getMyToken";

export async function removeCartItem(id:string) {
  
    const token = await  getMyToken()
     
    
if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {

    method : "DELETE" , 
    headers : {
        token : token , 
        "Content-Type" : "application/json"
    } 
  })

 
 const payload = res.json()

 return payload

}