export async function getUserOrders(id:string){
    
    
   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
   const data = await res.json()
  return data

}