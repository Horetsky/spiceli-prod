"use client";

import { useCart } from "@/providers/cart-provider";
import { FullProduct } from "@/types/types";
import Image from "next/image";
import { LuMinus, LuPlus, LuX } from "react-icons/lu";

const OrderedProducts = () => {
    const { orders } = useCart()
    return (
        <div>
            {/*<h2 className={"font-sofia font-bold text-3xl mb-11"}>*/}
            {/*    Кошик*/}
            {/*</h2>*/}

            <div className={"flex flex-col gap-y-6 border border-primary"}>
                {
                    orders.map(item => (
                        <CartItem {...item}/>
                    ))
                }
            </div>
        </div>
    )
}

const CartItem = (order: FullProduct) => {
    return (
        <div className={"grid grid-cols-[100px_1fr_30px_30px] grid-rows-[100px] gap-4"}>
            <div className={"relative rounded-[8px] overflow-hidden"}>
                <Image
                    fill
                    src={order.images[0].url}
                    className={"object-cover"}
                    alt={""}
                />
            </div>
            <div className={"flex flex-col self-center"}>
                <h4 className={"font-sofia font-bold text-xl"}>{ order.name }</h4>
                <div className={"flex items-end gap-6"}>
                    {
                        order.discount &&
                            <div className={"font-sofia text-lg md:text-base line-through text-customSecondary opacity-80"}>{ order.price } грн</div>
                    }
                    <div className={"text-lg"}>
                        { order.discount ? order.discount : order.price} грн
                    </div>
                </div>
            </div>
            <div className={"border border-[#a6a6a6] rounded-[4px] flex flex-col items-center justify-between p-2"}>
                <LuPlus />
                <span>1</span>
                <LuMinus />
            </div>
            <div className={"self-center"}>
                <LuX className="text-[#a6a6a6]" />
            </div>
        </div>
    )
}

export default OrderedProducts;