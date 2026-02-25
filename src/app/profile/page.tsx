"use client"
import { getAllAdresses } from '@/addressAction/getAllAdresses';
import { removeAddress } from '@/addressAction/removeAddress';
import { Address } from '@/types/Product.type';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function Profile() {
  const { data: session } = useSession()
  const [addresses, setAddresses] = useState([]);
  const [disabled, setdisabled] = useState(false);

  async function getAllAdressesUser() {
    const res = await getAllAdresses()
    setAddresses(res.data)
    
  }

   async function removeAdressesUser(id:string) {
    const res = await removeAddress(id)
    setAddresses(res.data)
    console.log(res);
    if (res.status === "success") {
      setdisabled(true)
        toast.success("Address removed successfully!", { position: "top-center" });
      
      } else {
        setdisabled(true)
        toast.error(res.message || "Failed to add address", { position: "top-center" });
      }
    
    
  }

  
   



  useEffect(()=>{
    function falg() {
      getAllAdressesUser()
    }
    falg()

  } , [])

 

  return (
    <div className='mt-12 max-w-4xl mx-auto px-4 pb-20'>
      {/* الجزء القديم بتاع البروفايل */}
      <div className="text-center mb-10">
        <div className="relative inline-flex mb-4">
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></span>
          <div className="relative bg-linear-to-tr from-emerald-500 to-teal-400 p-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
            <i className="fa-regular fa-user text-white text-2xl"></i>
          </div>
        </div>
        <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight mb-2">
          {session?.user?.name || "User Name"}
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium">
          {session?.user?.email || "user@example.com"}
        </p>
        
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-center mb-16">
        <Link href="/updatedata" className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-white border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300">
          <i className="fa-solid fa-user-gear text-emerald-500 group-hover:scale-110 transition-transform"></i>
          <span className="font-semibold">Edit Profile</span>
        </Link>
        <Link href="/changepassword" className="group flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 hover:-translate-y-0.5 transition-all duration-300">
          <i className="fa-solid fa-lock text-emerald-100 group-hover:rotate-12 transition-transform"></i>
          <span className="font-semibold">Change Password</span>
        </Link>
            <Link href="/allorders" className="group flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 hover:-translate-y-0.5 transition-all duration-300">
          <span className="font-semibold">My Orders</span>
        </Link>
      </div>

      <hr className="border-gray-100 dark:border-slate-800 mb-10" />
    

      <div className="space-y-6 w-[80%]">
        <div className="flex justify-between items-center p-3">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-map-location-dot text-emerald-500"></i>
            My Addresses
          </h2>
          <Link href="/addaddress" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
            <i className="fa-solid fa-plus-circle"></i> Add New
          </Link>
        </div>

<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
  {addresses?.map((address:Address) => (
    <div 
      key={address._id} 
      className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-500 ease-out overflow-hidden h-full"
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>

      <div className="relative">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 rounded-full border dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20">
            <i className="fa-solid  fa-location-dot text-emerald-500 text-[10px]"></i>
            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              {address.city}
            </span>
          </div>

          <div className="flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
   <button 
   disabled={disabled}
  onClick={() => { removeAdressesUser(address._id) }}
  title="Delete" 
  className=" group disabled:opacity-30 cursor-pointer p-2.5 flex items-center justify-center bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-300"
>
  <i className="fa-solid fa-trash-can text-sm text-slate-400 group-hover:text-red-600 transition-colors"></i>
</button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-200 font-semibold leading-snug line-clamp-2 min-h-12 group-hover:text-emerald-950 dark:group-hover:text-white transition-colors">
            {address.details}
          </p>
          
          <div className="flex items-center gap-3 py-2 px-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl w-fit border border-slate-100 dark:border-slate-800">
            <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg shadow-xs">
              <i className="fa-solid fa-phone text-emerald-500 text-[10px]"></i>
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-mono tracking-tighter">
              {address.phone}
            </span>
          </div>
        </div>
      </div>
      
    
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-emerald-500 to-teal-400 group-hover:w-full transition-all duration-700">
        
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  )
}