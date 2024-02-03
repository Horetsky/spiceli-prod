"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { DBOrder } from "@/app/(main)/order/_components/orderForm/formSchema";

export type OrderItem = DBOrder["cart"][number];

type CartContextValue = {
    orders: OrderItem[];
    setOrders: (state: OrderItem[]) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const { sessionValues } = useSessionStorage<OrderItem[]>("session_orders");

    const [orders, setOrders] = useState<OrderItem[]>(sessionValues ?? [])

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
    
    const saveOrder = (newOrder: Omit<OrderItem, "quantity">) => {
        const state: OrderItem[] = [
            ...orders, { ...newOrder, quantity: 1 }
        ]
        setOrders(state);
        setStorageValues(state)
    }

    const deleteOrder = (id: string) => {
        setOrders([...orders.filter(item => item.id !== id)])
        setStorageValues([...orders.filter(item => item.id !== id)])
    }

    const setQuantity = (id: string, quantity: number) => {
        const newOrder = orders.filter(item => item.id !== id)
        const itemId = orders.indexOf(orders.find(item => item.id === id)!)

        const newQuantity: OrderItem = {
            ...orders.find(item => item.id === id)!,
            quantity
        }

        setOrders([...newOrder.slice(0, itemId), newQuantity, ...newOrder.slice(itemId)])
        setStorageValues([newQuantity, ...newOrder])
    }

    const resetCart = () => {
        setOrders([])
        setStorageValues([])
    }

    const total = useMemo(() => {
        return orders.reduce((acc, item) => {
            if(item.discount) return acc + (item.discount * item.quantity)
            else return acc + (item.price * item.quantity)
        }, 0)
    }, [orders])

    return {
        orders,
        total,
        saveOrder,
        deleteOrder,
        setQuantity,
        resetCart
    }
}