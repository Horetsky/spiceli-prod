import OrderInfo from "@/app/(admin)/adminpanel/orders/_components/orderInfo";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { DBOrder } from "@/app/(main)/order/_components/orderForm/formSchema";
import { AdminOrder } from "@/app/(admin)/adminpanel/orders/page";
import Image from "next/image";
import { FullProduct } from "@/types/types";

const Page = async ({params}: { params: { id: string }}) => {
    const order = await prisma.order.findUnique({
        where: { id: params.id }
    })

    if(!order) return notFound();

    const adminOrder: AdminOrder = {
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        ...JSON.parse(order.data as string) as DBOrder
    }

    return (
        <>
            <div>
                <h2 className={"font-sofia font-bold text-3xl mb-9 flex gap-1"}>
                    Замовлення
                    {
                        adminOrder.cart.length > 0 &&
						<span>({adminOrder.cart.length})</span>
                    }
                </h2>
                <div className={"lex flex-col gap-y-6"}>
                    {
                        adminOrder.cart.map(item => (
                            <CartItem {...item} />
                        ))
                    }
                </div>
            </div>
            <OrderInfo {...adminOrder} />
        </>
    )
}

export default Page;

const CartItem = (order: FullProduct & { quantity: number }) => {
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
                    <div className={"w-fit flex items-center gap-1 p-1"}>
                        Кількість:
                        <span>
                            x{ order.quantity } шт.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}