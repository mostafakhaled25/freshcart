"use server"


import { updateUserDataType } from "@/schema/ubdateData.schema";
import { getMyToken } from "@/utilities/getMyToken";


export async function ubdateData( values : updateUserDataType ) {
  

    const token =  await getMyToken()
  
    if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/` , {

    method : "PUT" , 
    headers : {
        token : token , 
        "Content-Type" : "application/json"
    } , 
    body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone
      })
  })

 
 const payload = await res.json()

 return payload


}