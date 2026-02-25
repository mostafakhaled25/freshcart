"use server"
import { getMyToken } from "@/utilities/getMyToken";


export async function addToCart(id:string) {
  
  try{
    
    const token =  await getMyToken()
  
    if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {

    method : "POST" , 
    headers : {
        token : token , 
        "Content-Type" : "Application/json"
    } , 
    body : JSON.stringify({
       productId: id
    })
  })

 
 const payload = res.json()

 return payload
  }catch(error){
   return error
  }


}