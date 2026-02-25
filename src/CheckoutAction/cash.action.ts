"use server"
import { CheckoutSchemaType } from "@/schema/checkout.schema";
import { getMyToken } from "@/utilities/getMyToken";


export async function cashPayment(cartId:string , defulValues : CheckoutSchemaType ) {
  
  
    const token =  await getMyToken()
  
    if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}` , {

    method : "POST" , 
    headers : {
        token : token , 
        "Content-Type" : "application/json"
    } , 
    body : JSON.stringify({
       shippingAddress : defulValues
    })
  })

 
 const payload = res.json()

 return payload


}