"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { Products } from "@prisma/client";
import { FullProduct } from "@/types/types";

type OrderItem = FullProduct;

type CartContextValue = {
    orders: OrderItem[];
    setOrders: (state: OrderItem[]) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const { sessionValues } = useSessionStorage<OrderItem[]>("session_orders");

    const [orders, setOrders] = useState<OrderItem[]>([])

    useEffect(() => {
        if (sessionValues) setOrders(sessionValues)
    }, [sessionValues])

    return (
        <CartContext.Provider value={{ orders, setOrders }}>
            { children }
        </CartContext.Provider>
    )
}

export function useCart() {
    const cart = useContext(CartContext);
    if(!cart) {
        throw new Error("Cart context should be used within <CartProvider></CartProvider>")
    }
    const { setStorageValues } = useSessionStorage<OrderItem[]>("session_orders");
    const { orders, setOrders } = cart;

    const saveOrder = (newOrder: OrderItem) => {
        setOrders([...orders, newOrder])
        setStorageValues([...orders, newOrder])
    }

    const deleteOrder = (id: string) => {
        setOrders([...orders.filter(item => item.id !== id)])
        setStorageValues([...orders.filter(item => item.id !== id)])
    }

    const resetCart = () => {
        setOrders([])
        setStorageValues([])
    }

    return {
        orders,
        saveOrder,
        deleteOrder
    }
}