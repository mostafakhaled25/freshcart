"use server"
import { getMyToken } from "@/utilities/getMyToken";


export async function updateCart(id:string , count:string) {
  
  
    const token =  await getMyToken()
  
    if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {

    method : "PUT" , 
    headers : {
        token : token , 
        "Content-Type" : "application/json"
    } , 
    body : JSON.stringify({
       count : count 
    })
  })

 
 const payload = res.json()

 return payload


}