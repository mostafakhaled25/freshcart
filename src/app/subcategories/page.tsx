
import { getSubCategories } from '@/api/allSubCategory';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'
import Link from 'next/link';
import { Subcategory } from '@/types/Product.type';

export default async function SubCategory() {

     const subCategory = await getSubCategories();
      console.log(subCategory);
  return <>
    

      
<div className=" p-8 mt-6">

  {subCategory?.map((item:Subcategory) => {
    return (
     
     
    <Link   key={item._id} href={`/subcategories/${item._id}`}>
     <div    className='p-2'>
        <Card
         
      
        className="
        transition-all duration-300
        hover:shadow-xl
        dark:bg-slate-900
        "
      >
        <CardHeader className='dark:bg-slate-900'>
          <CardTitle className="text-lg font-bold">
            {item.name}
          </CardTitle>

          <CardDescription className="text-sm text-gray-500 truncate">
            {item.slug}
          </CardDescription>
        </CardHeader>

        <CardContent>
            Click here to Show Details
        </CardContent>

        <CardFooter>
          <Button 
            variant="outline"
            size="sm"
            className="w-full cursor-pointer"
          >
           Show Details
          </Button>
        </CardFooter>
      </Card>
      </div>
    
    
    </Link>
    );
  })}

</div>
    
   

  
  </>
}
