"use client"

import { getUserWishList } from '@/wishlistAction/getUserWishlist.action';
import { removeWishItem } from '@/wishlistAction/removeWishItem';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import AddBtn from '../_components/AddBtn/AddBtn';
import { WishContext } from '@/context/WishlistContext';
import { WishlistProduct } from '@/types/Wishlist.type';
import Image from 'next/image';

export default function Wislist() {

    const [disableflag, setdisableflag] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [products, setproducts] = useState([]);
    const { itemsWish, setitemsWish } = useContext(WishContext)!
    const {  setWishlistIds } = useContext(WishContext)!;




 async function removeWishProduct(id: string) {
        setdisableflag(true);

        try {
            const res = await removeWishItem(id);

            if (res.status === "success") {
                setproducts((prevProducts) => prevProducts.filter((item: WishlistProduct) => item.id !== id));
                setitemsWish(itemsWish - 1);
                setWishlistIds((prevIds) => prevIds.filter((wishId) => wishId !== id));
                toast.success("Product removed from wishlist", {
                    duration: 3000,
                    position: "top-center"
                });

            } else {
                toast.error("Failed to remove product");
            }
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Something went wrong");
        } finally {
            setdisableflag(false);
        }
    }


    async function getUserWishProduct() {

        const res = await getUserWishList()
        if (res.status == "success") {
            setproducts(res.data)
            setisloading(false)
        } else {
            setisloading(false)
        }

    }







    useEffect(() => {
        getUserWishProduct()
    }, [])

    return (
        <>
            {isloading ? (
                <div className="flex justify-center items-center h-screen dark:bg-slate-900">
                    <div className="sk-chase">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="sk-chase-dot"></div>
                        ))}
                    </div>
                </div>
            ) : products.length > 0 ? (
                <div className="w-[95%] lg:w-[85%] mx-auto mt-10 mb-10">
                    <div className="w-[90%] max-w-7xl mx-auto flex justify-between mb-12 pb-8 border-b border-gray-100 dark:border-slate-800">
                        {/* Left Side: Dynamic Icon & Title */}
                        <div className="flex items-center gap-6 ">
                            {/* Cart Icon with Notification Badge */}
                            <div className="relative group">
                                <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-green-500 text-white rounded-2xl shadow-xl transform group-hover:rotate-3 transition-transform duration-300">
                                    <i className="fa-regular fa-heart text-2xl"></i>
                                </div>

                                {/* Product Count Badge */}
                                <span className="absolute -top-3 -right-3 flex h-6 min-w-5 lg:h-8 lg:min-w-8 px-2 items-center text-white justify-center bg-blue-500 text-xs font-black rounded-full border-4 border-blue-500 dark:border-slate-900 shadow-lg animate-bounce-short">
                                    {products.length}
                                </span>
                            </div>

                            <div>
                                <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    Your Wishlist
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                        {/* Desktop Table - Visible on MD and up */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600 dark:text-slate-400">
                                <thead className="text-xs uppercase bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 border-b dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Product</th>
                                        <th className="px-8 py-4 font-semibold">Price</th>
                                        <th className="px-12 py-4 font-semibold text-right">Action</th>
                                        <th className="px-12 py-4 font-semibold text-right">Adding</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {products.map((prod: WishlistProduct) => (
                                        <tr key={prod.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        width={25}
                                                        height={25}
                                                        src={prod.imageCover}
                                                        className="w-20 h-20 object-cover rounded-lg border dark:border-slate-700"
                                                        alt={prod.title}
                                                    />
                                                    <span className="font-bold text-gray-800 dark:text-slate-200 max-w-50">{prod.title}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                                {prod.price} <span className="text-[10px] text-gray-400">EGP</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    disabled={disableflag}
                                                    onClick={() => removeWishProduct(prod.id)}
                                                    className="cursor-pointer p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors disabled:opacity-30"
                                                >
                                                    Delete <i className="fa-solid fa-trash-can text-lg"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <div className='flex items-end justify-end me-6'>
                                                    <AddBtn id={prod.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden divide-y divide-gray-100 dark:divide-slate-800">
                            {products.map((prod: WishlistProduct) => (
                                <div key={prod.id} className="p-4 flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <Image
                                            width={25}
                                            height={25}
                                            src={prod.imageCover}
                                            className="w-12 h-12 object-cover rounded-xl border dark:border-slate-700"
                                            alt={prod.title}
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 dark:text-slate-200 leading-tight line-clamp-2">{prod.title}</h3>
                                            <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">{prod.price} EGP</p>
                                        </div>
                                        <div className='flex flex-col justify-between items-center gap-4'>
                                            <button
                                                onClick={() => removeWishProduct(prod.id)}
                                                disabled={disableflag}
                                                className="cursor-pointer h-10 w-10 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center disabled:opacity-30"
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                           <AddBtn id={prod.id}  />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center dark:bg-slate-900">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full scale-150 blur-3xl opacity-30"></div>
                        <div className="relative bg-white dark:bg-slate-900 shadow-2xl rounded-full w-40 h-40 flex items-center justify-center border border-gray-50 dark:border-slate-800">
                            <i className="fa-regular fa-heart text-5xl lg:text-8xl text-neutral-200 dark:text-slate-700"></i>
                            <div className="absolute top-8 right-8 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm">
                                <i className="fa-solid fa-xmark text-xs"></i>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-3"> Wishlist is empty</h2>
                    <p className="text-gray-500 dark:text-slate-400 max-w-xs mb-10 leading-relaxed">
                        Looks like you haven&apos;t added anything yet. Start shopping to fill it with awesome deals!
                    </p>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-100 dark:shadow-none hover:scale-105 active:scale-95"
                    >
                        <i className="fa-solid fa-bag-shopping"></i>
                        Start Put in Wishlist
                    </Link>
                </div>
            )}
        </>
    );


}

