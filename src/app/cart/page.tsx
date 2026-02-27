"use client"
import { clearCart } from '@/CartActions/clearCart.action';
import { getUserCart } from '@/CartActions/getUserCart.action'
import { removeCartItem } from '@/CartActions/removeCartItem.action';
import { updateCart } from '@/CartActions/updateCart.action';
import { CartContext } from '@/context/CartContext';
import { ProductCart } from '@/types/Cart.type';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function Cart() {
    const [updateloading, setupdateloading] = useState(false);
    const [disableflag, setdisableflag] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [products, setproducts] = useState([]);
    const [currentId, setcurrentId] = useState('');
    const [disabaledUbdateBtn, setdisabaledUbdateBtn] = useState(false);
    const [carId, setcarId] = useState("");
     const [isSubmitting, setIsSubmitting] = useState(false);

    const { countCart, setCountCart } = useContext(CartContext)!


    async function removeCartItemFromProduct(id: string) {
        setdisableflag(true)
        setdisabaledUbdateBtn(true)
        const res = await removeCartItem(id)


        if (res.status == "success") {
            setproducts(res.data.products)

            setdisableflag(false)
            setdisabaledUbdateBtn(false)
            toast.success("The Product is deleted successfully ", {
                duration: 3000,
                position: "top-center"
            })

            let sum = 0
            res.data.products.forEach((product: ProductCart) => {
                sum += product.count
            });
            setCountCart(sum)

        } else {
            toast.error("The Product Can't be deleted ", {
                duration: 3000,
                position: "top-center"

            })
            setdisabaledUbdateBtn(false)
            setdisableflag(false)
        }

    }



    async function getUserCartProduct() {

        const res = await getUserCart()

        setcarId(res.cartId);



        if (res.status == "success") {
            setproducts(res.data.products)
            setisloading(false)
        } else {
            setisloading(false)
        }

    }

    async function updateCartProduct(id: string, count: string, assign: string) {
        setdisableflag(true)
        setdisabaledUbdateBtn(true)
        setupdateloading(true)
        setcurrentId(id)
        const res = await updateCart(id, count)
        if (res.status == "success") {
            setproducts(res.data.products)
            setupdateloading(false)
            toast.success("The Product is Updated successfully ", {
                duration: 3000,
                position: "top-center"
            })
            setdisabaledUbdateBtn(false)
            setdisableflag(false)

            if (assign == "-") {
                setCountCart(countCart - 1)
            } else if (assign == "+") {
                setCountCart(countCart + 1)
            }


        } else {
            toast.error("The Product Can't be Updated ", {
                duration: 3000,
                position: "top-center"

            })
            setupdateloading(false)
            setdisabaledUbdateBtn(false)
            setdisableflag(false)
        }


    }

    async function clearAllProduct() {
        const res = await clearCart()
        if (res.message == "success") {
            toast.success("All Products were deleted successfully ", {
                duration: 3000,
                position: "top-center"
            })
            setproducts([])
            setCountCart(0)

        }

    }

    async function handleCheckout() {
    setIsSubmitting(true);
}



    useEffect(() => {
        function flag() {
            getUserCartProduct()
        }
        flag()

    }, [])

    return (
        <>
            {isloading ? (
                <div className="flex justify-center items-center h-screen dark:bg-slate-900">
                    <div className="sk-chase">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="sk-chase-dot after:dark:bg-white"></div>
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
                                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                                </div>

                                {/* Product Count Badge */}
                                <span className="absolute -top-3 -right-3 flex h-6 min-w-5 lg:h-8 lg:min-w-8 px-2 items-center text-white justify-center bg-blue-500 text-xs font-black rounded-full border-4 border-blue-500 dark:border-blue-600 shadow-lg animate-bounce-short">
                                    {products.length}
                                </span>
                            </div>

                            <div>
                                <h2 className="hidden lg:block text-2xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    Your Cart
                                </h2>
                            </div>
                        </div>

                        {/* Right Side: Action Button */}
                        <div className="flex items-center gap-4 ">
                            <button
                                onClick={() => clearAllProduct()}
                                type="button"
                                className="cursor-pointer group flex-1 md:flex-none flex items-center justify-center gap-3 px-4 py-4 bg-white dark:bg-slate-800 text-red-500 font-bold rounded-2xl border-2 border-red-50 dark:border-red-900/30 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 active:scale-95"
                            >
                                <i className="fa-solid fa-trash-can text-[10px] group-hover:animate-out"></i>
                                <span className="text-[10px] uppercase tracking-widest">Clear Cart</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden shadow-xl rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">

                        {/* Desktop Table - Visible on MD and up */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                                <thead className="text-xs uppercase bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border-b dark:border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Product</th>
                                        <th className="px-14 py-4 font-semibold">Quantity</th>
                                        <th className="px-8 py-4 font-semibold">Price</th>
                                        <th className="px-12 py-4 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {products.map((prod: ProductCart) => (
                                        <tr key={prod.product.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <Image
                                                        width={50}
                                                        height={50}
                                                        src={prod.product.imageCover}
                                                        className="w-20 h-20 object-cover rounded-lg border dark:border-slate-700"
                                                        alt={prod.product.title}
                                                    />
                                                    <span className="font-bold text-gray-800 dark:text-gray-200 max-w-50">{prod.product.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg p-1 w-fit">
                                                    <button
                                                        disabled={disabaledUbdateBtn}
                                                        onClick={() => updateCartProduct(prod.product.id, `${prod.count - 1}`, "-")}
                                                        className="cursor-pointer h-8 w-8 flex items-center justify-center bg-white dark:bg-slate-700 dark:text-white rounded-md shadow-sm hover:text-red-600 transition-all disabled:opacity-30"
                                                    >
                                                        <i className="fa-solid fa-minus text-xs"></i>
                                                    </button>

                                                    <div className="mx-4 w-8 flex justify-center items-center">
                                                        {currentId === prod.product.id && updateloading ? (
                                                            <i className="fas fa-circle-notch fa-spin text-emerald-600 font-bold"></i>
                                                        ) : (
                                                            <span className="font-black text-gray-700 dark:text-gray-200 text-center animate-fadeIn">
                                                                {prod.count}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        disabled={disabaledUbdateBtn}
                                                        onClick={() => updateCartProduct(prod.product.id, `${prod.count + 1}`, "+")}
                                                        className="cursor-pointer h-8 w-8 flex items-center justify-center bg-white dark:bg-slate-700 dark:text-white rounded-md shadow-sm hover:text-green-600 transition-all disabled:opacity-30"
                                                    >
                                                        <i className="fa-solid fa-plus text-xs"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                                {prod.price} <span className="text-[10px] text-gray-400">EGP</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    disabled={disableflag}
                                                    onClick={() => removeCartItemFromProduct(prod.product.id)}
                                                    className="cursor-pointer p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors disabled:opacity-30"
                                                >
                                                    Delete <i className="fa-solid fa-trash-can text-lg"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile List */}
                        <div className="md:hidden divide-y divide-gray-100 dark:divide-slate-800">
                            {products.map((prod: ProductCart) => (
                                <div key={prod.product.id} className="p-4 flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <Image
                                            width={50}
                                            height={50}
                                            src={prod.product.imageCover}
                                            className="w-24 h-24 object-cover rounded-xl border dark:border-slate-700"
                                            alt={prod.product.title}
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 leading-tight">{prod.product.title}</h3>
                                            <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">{prod.price} EGP</p>
                                        </div>
                                        <button
                                            onClick={() => removeCartItemFromProduct(prod.product.id)}
                                            disabled={disableflag}
                                            className="cursor-pointer h-10 w-10 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center disabled:opacity-30"
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-2 rounded-xl">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Quantity</span>
                                        <div className="flex items-center bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg p-1">
                                            <button
                                                disabled={updateloading && currentId === prod.product.id}
                                                onClick={() => updateCartProduct(prod.product.id, `${prod.count - 1}`, "-")}
                                                className="cursor-pointer h-8 w-8 flex items-center justify-center dark:text-white disabled:opacity-30"
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <div className="mx-4 w-8 flex justify-center items-center">
                                                {currentId === prod.product.id && updateloading ? (
                                                    <i className="fas fa-circle-notch fa-spin text-emerald-600 font-bold"></i>
                                                ) : (
                                                    <span className="font-black text-gray-700 dark:text-gray-200 text-center">
                                                        {prod.count}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                disabled={updateloading && currentId === prod.product.id}
                                                onClick={() => updateCartProduct(prod.product.id, `${prod.count + 1}`, "+")}
                                                className="cursor-pointer h-8 w-8 flex items-center justify-center dark:text-white disabled:opacity-30"
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-gray-900 dark:bg-slate-800 rounded-2xl p-6 md:p-8 text-white shadow-xl">
                        <div className="mb-4 md:mb-0 text-center md:text-left">
                            <p className="text-gray-400 dark:text-gray-500 text-sm">Total Amount</p>
                            <p className="text-3xl font-black text-emerald-400">
                                {products?.reduce((acc, curr: ProductCart) => acc + (curr.price * curr.count), 0)} <span className="text-sm">EGP</span>
                            </p>
                        </div>
                    <Link 
        href={`/checkout/${carId}`} 
        onClick={handleCheckout}
        className={`group w-full md:w-auto px-10 py-4 font-black rounded-xl transition-all flex items-center justify-center gap-3 
            ${isSubmitting 
                ? "bg-emerald-800 cursor-not-allowed pointer-events-none" 
                : "bg-emerald-500 hover:bg-emerald-400 text-gray-900"}`}
    >
        {isSubmitting ? (
            <span className="flex items-center gap-2 ">
                <i className="fas fa-circle-notch fa-spin"></i>
                <span className="animate-pulse">Processing...</span>
            </span>
        ) : (
            <>
                <span>Checkout Now</span>
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </>
        )}
    </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center dark:bg-slate-900">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-full scale-150 blur-3xl opacity-30"></div>
                        <div className="relative bg-white dark:bg-slate-800 shadow-2xl rounded-full w-40 h-40 flex items-center justify-center border border-gray-50 dark:border-slate-700">
                            <i className="fa-solid fa-cart-shopping text-6xl text-gray-200 dark:text-slate-700"></i>
                            <div className="absolute top-8 right-8 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-sm">
                                <i className="fa-solid fa-xmark text-xs"></i>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-10 leading-relaxed">
                        Looks like you haven&apos;t added anything yet. Start shopping to fill it with awesome deals!
                    </p>
                    <Link
                        href={"/"}
                        className="flex items-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-100 dark:shadow-none hover:scale-105 active:scale-95"
                    >
                        <i className="fa-solid fa-bag-shopping"></i>
                        Start Shopping
                    </Link>
                </div>
            )}
        </>
    );


}
