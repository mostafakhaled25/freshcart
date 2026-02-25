"use server"

import { addAddressType } from "@/schema/addAddress.shema";
import { getMyToken } from "@/utilities/getMyToken";


export async function addAddress( values : addAddressType ) {
  
   
    const token =  await getMyToken()
  
    if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses` , {

    method : "POST" , 
    headers : {
        token : token , 
        "Content-Type" : "application/json"
    } , 
    body: JSON.stringify({
       name: values.name,
        details: values.details,
        phone: values.phone,
        city : values.city
      })
  })

 
 const payload = await res.json()

 return payload


}