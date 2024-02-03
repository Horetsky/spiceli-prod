"use client"

import RefreshOnMount from "@/hooks/RefreshOnMount";
import SearchPannel from "@/components/searchPannel/SearchPannel";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EmptyList from "@/app/(admin)/adminpanel/(components)/EmptyList";
import ProductTableItem from "@/app/(admin)/adminpanel/products/(components)/ProductTableItem";
import { useState } from "react";
import { AdminOrder } from "@/app/(admin)/adminpanel/orders/page";
import OrderTableItem from "@/app/(admin)/adminpanel/orders/_components/orderTableItem";

const OrderTable = ({ orders }: {orders: AdminOrder[]}) => {
    const [filteredProducts, setFilteredProducts] = useState<AdminOrder[]>(orders);

    function handleSearch (val: string) {
        if (val === "") {
            setFilteredProducts(orders)
        } else {
            const filteredProducts = orders.filter(item => {
                const term = val.toLowerCase()
                const isName = item.order.name.toLowerCase().includes(term);
                const isSurname = item.order.surname.toLowerCase().includes(term)
                const isPhone = item.order.phone.toLowerCase().includes(term);

                return isName || isSurname || isPhone
            })
            setFilteredProducts(filteredProducts)
        }
    }

    return (
        <RefreshOnMount>
            <div className='flex flex-col gap-y-2 pt-6'>
                <div className='grid grid-cols-1'>
                    <SearchPannel
                        className='rounded-[4px] w-[85%]'
                        placeholder='Пошук замовлень...'
                        searchFunc={handleSearch}
                    />
                </div>
                <Table>
                    <TableCaption>
                        {
                            orders?.length === 0 ?
                                <EmptyList message='Замовлень покищо немає' /> :
                                <>Список усіх замовлень</>
                        }
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">№</TableHead>
                            <TableHead>Ім'я</TableHead>
                            <TableHead>Номер телефону</TableHead>
                            <TableHead>Сума</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className='text-right'>Редагувати</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredProducts?.map((item, i) => (
                                <OrderTableItem order={item} number={i+1} />
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </RefreshOnMount>
    )
}

export default OrderTable;