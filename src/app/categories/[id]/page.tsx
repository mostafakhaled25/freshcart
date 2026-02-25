import { getSpecificCategory } from '@/api/specificCategory'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default async function SubCategory({params} : {params : {id:string}}) {


    const {id} = await  params
      
    const {data} = await getSpecificCategory(id)
  
     console.log(data)
  return <>

<div className="flex justify-center px-4 ">
  <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 mx-auto mt-6 
  bg-white dark:bg-slate-900 
  border border-gray-100 dark:border-gray-700 
  rounded-3xl 
  shadow-lg dark:shadow-slate-900/40 
  hover:shadow-2xl dark:hover:shadow-black/50 
  transition-all duration-500 overflow-hidden">
    
    <div className="relative w-3/4 h-3/4 flex justify-center items-center">
      <Image 
        loading="eager" 
        className="h-3/4" 
        width={400} 
        height={400} 
        src={data.image} 
        alt="" 
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
      />

      <div className="absolute inset-0 
      bg-linear-to-t 
      from-black/70 via-black/20 to-transparent 
      opacity-0 hover:opacity-100 
      transition-opacity duration-500"></div>
    </div>

    <div className="p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4">
      <div className="flex-1">
        <h5 className="mb-2 text-2xl md:text-3xl font-black 
        text-gray-900 dark:text-white capitalize">
          {data.name}
        </h5>

        <p className="mb-6 sm:mb-0 text-sm md:text-base font-medium 
        text-gray-500 dark:text-gray-400">
          Explore the latest trends in{" "}
          <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-2 underline-offset-4">
            {data.slug.replace('-', ' ')}
          </span>
        </p>
      </div>

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
    </div>
  </div>
</div>




 


 
    


</>
}

  