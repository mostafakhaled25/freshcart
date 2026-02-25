import { getSpecificSubCategory } from '@/api/specificSubCategory'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

export default async function SpecificSubCategory({params} : {params : {id:string}}) {

     const {id} = await  params
          
        const {data} = await getSpecificSubCategory(id)
      
         console.log(data)
  return <>
  
    <div className='w-full bg-amber-400 p-8'>

        <div   className='p-2'>
        <Card
         
      
        className="
        transition-all duration-300
        hover:shadow-xl
        dark:bg-slate-900
        "
      >
        <CardHeader className='dark:bg-slate-900'>
          <CardTitle className="text-lg font-bold">
            {data.name}
          </CardTitle>

          <CardDescription className="text-sm text-gray-500 truncate">
            {data.slug}
          </CardDescription>
        </CardHeader>

        <CardContent>
           
        </CardContent>

        <CardFooter>
             <Link
        href="/" 
        className="relative inline-flex items-center justify-center 
        w-full sm:w-auto px-7 py-4 
        overflow-hidden font-bold text-white 
        transition-all duration-300 
        bg-blue-600 hover:bg-blue-700 
        dark:bg-blue-500 dark:hover:bg-blue-600
        rounded-2xl group active:scale-95 
        shadow-xl shadow-blue-200 
        dark:shadow-blue-900/40">
        
        <span className="relative flex items-center text-sm md:text-base">
          Shop Now
        </span>
      </Link>
        </CardFooter>
      </Card>
      </div>
    </div>
  
  </>
}
