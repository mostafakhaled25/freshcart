"use client";
import { Product } from "@/types/Product.type";
import { getUserWishList } from "@/wishlistAction/getUserWishlist.action";
import { createContext, ReactNode, useEffect, useState } from "react";

interface WishContextType {
  itemsWish: number;
  setitemsWish: React.Dispatch<React.SetStateAction<number>>;
  wishlistIds: string[]; 
  setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const WishContext = createContext<WishContextType | undefined>(undefined);

export function WishContextProvider({ children }: { children: ReactNode }) {
  const [itemsWish, setitemsWish] = useState<number>(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]); 

  async function getLoggedUserWish() {
    try {
      const res = await getUserWishList();
      if (res.status === "success") {
        setitemsWish(res.data.length);
        const ids = res.data.map((item: Product) => item._id || item.id);
        setWishlistIds(ids);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   function flag() {
     getLoggedUserWish();
   }
   flag()

  }, []);

  return (
    <WishContext.Provider value={{ itemsWish, setitemsWish, wishlistIds, setWishlistIds }}>
      {children}
    </WishContext.Provider>
  );
}