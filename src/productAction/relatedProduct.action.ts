"use server"

export async function getRelatedProducts(catId:string){
    
   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`)
   const payload = await res.json()
  return payload

}