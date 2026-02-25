"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getMyToken() {
  const tokenDecode =  (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__Secure-next-auth.session-token")?.value
  
  if (!tokenDecode) {
    return null
  }
    
  const token = await decode({token : tokenDecode , secret : process.env.AUTH_SECRET!  })
  console.log(token?.token);
  
  return token?.token
   
}