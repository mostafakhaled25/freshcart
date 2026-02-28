
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import Image from 'next/image'
import img1 from "../../../../public/images/freshcart-logo.svg"



import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CartContext } from "@/context/CartContext";
import { WishContext } from "@/context/WishlistContext";
import { useTheme } from "next-themes";
import { Moon , User } from "lucide-react";

export default function Navbar() {
   const { theme, setTheme } = useTheme()
 
  const [open, setOpen] = useState(false);
      
  const {countCart } = useContext(CartContext)!
  const {itemsWish } = useContext(WishContext)!
 

  const { data: session } = useSession()

  function logOut() {
    signOut({
      callbackUrl: "/login"
    })
  }

return (
    <nav className=" bg-slate-100 dark:bg-slate-800 fixed top-0 start-0 end-0 z-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          <div className="flex items-center gap-2 font-semibold text-lg">
            <Link href="/"> 
              <Image width={150} height={50} priority src={img1} className="w-full object-contain dark:invert" alt="freshcart" />
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-6">
            <li><Link href="/" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Home</Link></li>
            <li><Link href="/products" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Products</Link></li>
            <li><Link href="/categories" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Categories</Link></li>
          <li><Link href="/subcategories" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Subcategories</Link></li>

           <li><Link href="/brands" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Brands</Link></li>
          </ul>



          {!session ? <>
            <div className="hidden md:flex items-center gap-4">
              <i className="fa-brands fa-facebook cursor-pointer text-gray-600 dark:text-gray-400"></i>
              <i className="fa-brands fa-twitter cursor-pointer text-gray-600 dark:text-gray-400"></i>
              <i className="fa-brands fa-youtube cursor-pointer text-gray-600 dark:text-gray-400"></i>
              <i className="fa-brands fa-instagram cursor-pointer text-gray-600 dark:text-gray-400"></i>
              <i className="fa-brands fa-linkedin cursor-pointer text-gray-600 dark:text-gray-400"></i>

              <Link href="/login" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Login</Link>
              <Link href="/register" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Register</Link>
            </div>
          </> : <>

            <Tooltip>
              <TooltipTrigger> 
                {session ? <Link href="/wishlist" className="relative p-2">
                  <i className="fa-regular fa-heart mt-1 text-xl lg:text-2xl text-gray-700 dark:text-gray-200"></i>
                  {itemsWish > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white border-2 border-white">
                    {itemsWish}
                  </span>}
                </Link> : ""}
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">Your Wishlist</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                {session ? <Link href="/cart" className="relative p-2">
                  <i className="fa-solid fa-cart-arrow-down mt-1 text-xl lg:text-2xl text-gray-700 dark:text-gray-200"></i>
                  {countCart > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white border-2 border-white">
                    {countCart}
                  </span>}
                </Link> : ""}
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium"> Your Cart</p>
              </TooltipContent>
            </Tooltip>
                          <Link href="/profile" className="text-gray-700 dark:text-white hover:text-blue-500 transition-colors">
         <User className="cursor-pointer lg:text-2xl " size={24} />
               </Link>


            <>
              <div className="justify-between hidden md:flex">
                <div className="flex justify-center items-center bg-slate-200 dark:bg-slate-800 dark:text-white px-2 py-1 rounded-full shadow-sm font-medium transition-transform transform hover:scale-105">
                  Welcome {session?.user?.name}
                </div>
              </div>
              <span onClick={logOut} className="cursor-pointer hidden md:block text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">
                SignOut <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </span>
            </>
          </>}

                          <div className="flex p-3  items-center gap-5">
                <Moon className="cursor-pointer lg:text-2xl text-gray-700 dark:text-yellow-400 " size={22} onClick={() => { theme == "light" ? setTheme("dark") : setTheme("light") }} />
          <span className="md:hidden text-2xl font-semibold dark:text-white z-40" onClick={() => setOpen(!open)}>
            <Tooltip>
              <TooltipTrigger><i className="fa-solid fa-bars cursor-pointer"></i></TooltipTrigger>
              <TooltipContent>
                <p>Open Menu</p>
              </TooltipContent>
            </Tooltip>
          </span>
                          </div>


        </div>
      </div>


     
      {open && (
        <div className="md:hidden bg-slate-100 dark:bg-slate-800 px-4 py-3 space-y-2 border-t dark:border-slate-800">
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Home</Link></li>
            <li><Link href="/products" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Products</Link></li>
            <li><Link href="/categories" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Categories</Link></li>
            <Link href="/subcategories" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Subcategories</Link>
            <li><Link href="/brands" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Brands</Link></li>
          </ul>

          <hr className="border-gray-300 dark:border-gray-700" />

          {!session ? <>
            <div className="flex gap-4 text-lg">
              <ul className="flex gap-5">
                <li><i className="fa-brands fa-facebook cursor-pointer text-gray-600 dark:text-gray-400"></i></li>
                <li><i className="fa-brands fa-twitter cursor-pointer text-gray-600 dark:text-gray-400"></i></li>
                <li><i className="fa-brands fa-youtube cursor-pointer text-gray-600 dark:text-gray-400"></i></li>
                <li><i className="fa-brands fa-instagram cursor-pointer text-gray-600 dark:text-gray-400"></i></li>
                <li><i className="fa-brands fa-linkedin cursor-pointer text-gray-600 dark:text-gray-400"></i></li>
              </ul>
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />
            <div className="flex gap-4 pt-2">
              <ul className="flex gap-5">
                <li><Link href="/login" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Login</Link></li>
                <li><Link href="/register" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">Register</Link></li>
              </ul>
            </div>
          </> : <div>
            <div className="flex justify-between items-center">
              <div className="md:hidden flex justify-center text-xs items-center bg-slate-200 dark:bg-slate-800 dark:text-white px-2 py-1 rounded-full shadow-sm font-medium">
                Welcome {session?.user?.name} 
              </div>
              <span onClick={logOut} className="text-xs cursor-pointer text-gray-600 dark:text-gray-300 font-semibold hover:text-black dark:hover:text-white transition-all duration-300">
                SignOut <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
              </span>
 

            </div>
          </div>}
        </div>
      )}
    </nav>
  );
}

