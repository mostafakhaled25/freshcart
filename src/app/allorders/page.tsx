"use client";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { getUserOrders } from "@/api/getUserOrders";
import OrderCard from "./OrderCard";
import { Order } from "@/types/Order.types";



export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      getUserOrders(session.user.id).then((res) => {
        setOrders(res);
        console.log(res);
        setLoading(false);
      });
    }
  }, [session]);

  if (loading) return <><div className="flex justify-center items-center h-162.5">
      <div className="sk-chase ">
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
  <div className="sk-chase-dot"></div>
</div>
   </div></> ;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-8">My Orders</h1>
      {    orders.length > 0 ? (
                orders.map((order: Order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <h2 className="text-center text-3xl font-bold">No orders found.</h2>
      )}
    </div>
  );
}