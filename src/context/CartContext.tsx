"use client";

import { getUserCart } from "@/CartActions/getUserCart.action";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ProductCart } from "@/types/Cart.type";


// 1️⃣ Define Context Type
interface CartContextType {
  countCart: number;
  setCountCart: React.Dispatch<React.SetStateAction<number>>;
}



export const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartContextProvider({ children }: { children: ReactNode }) {

  const [countCart, setCountCart] = useState<number>(0);

  async function getLoggedUserCart() {
    try {
      const res = await getUserCart();

      if (res.status === "success") {
        let sum = 0;

        res.data.products.forEach((product: ProductCart) => {
          sum += product.count;
        });

        setCountCart(sum);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    function flag() {
      getLoggedUserCart();
    }
    flag()
  }, []);

  return (
    <CartContext.Provider value={{ countCart, setCountCart }}>
      {children}
    </CartContext.Provider>
  );
}