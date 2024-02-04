"use client";

import { OrderItem, useCart } from "@/providers/cart-provider";
import { FullProduct } from "@/types/types";
import Image from "next/image";
import { LuMinus, LuPlus, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import EmptyList from "@/components/ui/custom/EmptyList";

const OrderedProducts = () => {
    const { orders } = useCart()
    return (
        <div>
            <h2 className={"font-sofia font-bold text-3xl mb-9 flex gap-1"}>
                Кошик
                {
                    orders.length > 0 &&
                        <span>({orders.length})</span>
                }
            </h2>
            <div className={"lex flex-col gap-y-6"}>
                {
                    orders.length === 0 ?
                        <div className={"mt-36"}><EmptyList message={"Кошик порожній"} /></div>:
                    orders.map(item => (
                        <CartItem {...item}/>
                    ))
                }
            </div>
        </div>
    )
}

const CartItem = (order: OrderItem) => {
    const [orderQuantity, setOrderQuantity] = useState(order.quantity)
    const { orders, deleteOrder, setQuantity } = useCart();
    const router = useRouter()
    const handleOrderRemove = () => {
        deleteOrder(order.id)
        if(orders.length === 1) {
            return router.replace("/assortment/spices")
        }
    }

    useEffect(() => {
        setQuantity(order.id, orderQuantity)
    }, [orderQuantity]);

    return (
        <div
            className={"border-b border-input select-none py-[12px] md:py-[20px] overflow-hidden bg-white w-full grid grid-cols-[180px_1fr] grid-rows-[180px] gap-4"}>
            <div className={"relative rounded-[8px] overflow-hidden"}>
                <Image
                    fill
                    src={order.images[0].url}
                    className={"object-cover"}
                    alt={""}
                />
            </div>
            <div className={"flex flex-col justify-between"}>
                <div>
                    <h4 className={"font-sofia font-bold text-xl leading-none"}>{order.name}</h4>
                    <div className={"flex items-end gap-6 font-sofia"}>
                        {
                            order.discount &&
                            <div
                                className={"text-lg md:text-base line-through text-customSecondary opacity-80"}>{order.price} грн</div>
                        }
                        <div className={"text-lg"}>
                            {order.discount ? order.discount : order.price} грн
                        </div>
                    </div>
                </div>
                <div className={"flex items-end justify-between"}>
                    <div className={"w-fit border border-input rounded-[3px] flex items-center gap-6 p-1"}>
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className={"w-6 h-6 rounded-[2px]"}
                            onClick={() => setOrderQuantity(state => state + 1)}
                        >
                            <LuPlus/>
                        </Button>
                        <span>
                            { orderQuantity }
                        </span>
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            disabled={orderQuantity === 1}
                            className={"w-6 h-6 rounded-[2px]"}
                            onClick={() => setOrderQuantity(state => state - 1)}
                        >
                            <LuMinus/>
                        </Button>
                    </div>

                    <Button
                        variant={"link"}
                        className={"text-customSecondary"}
                        onClick={handleOrderRemove}
                    >
                        Видалити
                    </Button>

                </div>
            </div>
        </div>
    )
}

export default OrderedProducts;