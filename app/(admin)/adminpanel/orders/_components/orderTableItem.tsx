import { TableCell, TableRow } from "@/components/ui/table";
import { $Enums } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuEye, LuPencil } from "react-icons/lu";
import DeleteAlert from "@/app/(admin)/adminpanel/(components)/DeleteAlert";
import React from "react";
import { AdminOrder } from "@/app/(admin)/adminpanel/orders/page";

const OrderTableItem = ({ order, number }: { order: AdminOrder, number: number }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{ order.order.name } { order.order.surname }</TableCell>
            <TableCell>{ order.order.phone }</TableCell>
            <TableCell>{ order.order.totalPrice.toLocaleString() } грн</TableCell>
            <TableCell>{ new Date(order.createdAt ).toLocaleDateString() }</TableCell>
            <TableCell>
                <div
                    className={"w-full rounded-[4px] text-center text-white"}
                    style={{ backgroundColor:
                        order.status === "IN_PROCESS" ? "#FFBD49" : "#1E8D5F"
                    }}
                >
                    {
                        order.status === "IN_PROCESS" ? "Нове" : "Виконане"
                    }
                </div>
            </TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/orders/${order.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuEye />
                    </Button>
                </Link>
                {/*<DeleteAlert action={() => handleDelete(product.id)}/>*/}
            </TableCell>
        </TableRow>
    );
}

export default OrderTableItem;