import SectionTitle from "@/app/(admin)/adminpanel/(components)/SectionTitle";
import { Order, OrderStatus } from "@prisma/client";
import OrderTable from "@/app/(admin)/adminpanel/orders/_components/orderTable";
import prisma from "@/prisma/client";
import { DBOrder } from "@/app/(main)/order/_components/orderForm/formSchema";

export type AdminOrder = DBOrder & {
    id: string;
    status: OrderStatus;
    createdAt: Date
}
const Page = async () => {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    const adminOrders: AdminOrder[] = orders.map(item => ({
        id: item.id,
        status: item.status,
        createdAt: item.createdAt,
        ...JSON.parse(item.data as string) as DBOrder
    }))

    return (
        <div>
            <SectionTitle title='Замовлення'> </SectionTitle>
            <OrderTable orders={adminOrders} />
        </div>
    )
}

export default Page;