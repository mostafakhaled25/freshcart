"use server"

import { getMyToken } from "@/utilities/getMyToken";

export async function getUserCart() {
 try{
   
  const token = await getMyToken();

  if (!token) {
   
    throw new Error("you shoud logged in first"); 
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("error to cart");
    return null;
  }

  const payload = await res.json();
  return payload;
 } catch(error){
  return error
}
}