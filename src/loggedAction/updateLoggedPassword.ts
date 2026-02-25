"use server"

import { updatePasswordType } from "@/app/changepassword/page";
import { getMyToken } from "@/utilities/getMyToken";


export async function changePassword( values : updatePasswordType ) {
  
    const token =  await getMyToken()
  
    if (!token) {
    throw new Error("you shoud logged in first");
    
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword` , {

    method : "PUT" , 
    headers : {
        token : token , 
        "Content-Type" : "application/json"
    } , 
    body: JSON.stringify({
        currentPassword: values.currentPassword,
        password: values.password,
        rePassword: values.rePassword
      })
  })

 
 const payload = await res.json()

 return payload


}