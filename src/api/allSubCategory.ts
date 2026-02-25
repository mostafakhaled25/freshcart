export async function getSubCategories(){
    
 const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories")
 
 const {data} = await res.json()
 return data
}