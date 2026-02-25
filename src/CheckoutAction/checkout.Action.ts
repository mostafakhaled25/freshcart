"use server"
import { CheckoutSchemaType } from "@/schema/checkout.schema";
import { getMyToken } from "@/utilities/getMyToken";


export async function checkPayment(cartId:string , defulValues : CheckoutSchemaType ) {
  
    const url = process.env.NEXT_URL
    const token =  await getMyToken()
  
    if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` , {

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