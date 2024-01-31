import Link from "next/link";
import Image from "next/image";
import { LuX } from "react-icons/lu";
import { useCart } from "@/providers/cart-provider";
import { FullProduct } from "@/types/types";
export const CartItem = (order: FullProduct) => {
    const { deleteOrder } = useCart();
    const handleOrderDelete = () => {
        deleteOrder(order.id)
    }

    return (
        <div className='relative grid grid-cols-[60px_1.5fr] grid-rows-[60px] items-center gap-x-1 md:gap-x-4 w-full border-b border-lightGray pb-3'>
            <div
                className='cursor-pointer absolute top-2 -right-2'
                onClick={handleOrderDelete}
            >
                <LuX className="text-[#a6a6a6]" />
            </div>
            <div className="relative w-full h-full rounded-[6px] overflow-hidden shrink-0">
                <Image
                    src={order.images[0].url}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    alt="product"
                />
            </div>
            <div className="flex flex-col h-full justify-between text-left gap-y-1 md:gap-y-0">
                <Link href={""}>
                    <h1 className="w-full font-sofia font-semibold text-sm md:text-base text-customPrimary">
                        { order.name }
                    </h1>
                </Link>
                <div className="w-full grid grid-cols-2 items-center justify-between mt-1">
                    {
                        order.discount ?
                        <div className="font-sofia text-base md:text-base line-through text-customSecondary opacity-80">
                            {order.price} грн
                        </div> : <div></div>
                    }
                    <div className="text-lg font-sofia text-right">
                        {order.discount ? order.discount : order.price} грн</div>
                </div>
            </div>
        </div>
    );
};