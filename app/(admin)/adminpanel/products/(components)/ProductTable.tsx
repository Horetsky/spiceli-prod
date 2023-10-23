"use client"

import {FC, useEffect} from 'react'
import { useState } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import EmptyList from '../../(components)/EmptyList';
import ProductTableItem from './ProductTableItem';
import RefreshOnMount from "@/hooks/RefreshOnMount";
import { $Enums, Products } from '@prisma/client';
import SearchPannel from '@/components/searchPannel/SearchPannel';

interface CategoryTableProps {
    products: Products[]
}

type AvailablityStatus = keyof typeof $Enums.AvailablityStatus | "all";
type ProductType = keyof typeof $Enums.ProductType | "all";

const ProductTable: FC<CategoryTableProps> = ({ products }) => {
    const [filteredProducts, setFilteredProducts] = useState<Products[]>(products)

    const [productType, setProductType] = useState<ProductType>("all");
    const [availablity, setAvailablity] = useState<AvailablityStatus>("all");

    function handleSearch (val: string) {
        if (val === "") {
            setFilteredProducts(products)
            setProductType("all")
            setAvailablity("all")
        } else {
            const filteredProducts = products.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
            setFilteredProducts(filteredProducts)
        }
    }

    useEffect(() => {
        if (productType === "all") {
            setFilteredProducts(products)
        } else {
            const filteredProducts = products.filter(item => item.type === productType)
            setFilteredProducts(filteredProducts)
        }
    }, [productType])

    useEffect(() => {
        if (availablity === "all") {
            setFilteredProducts(products)
        } else {
            const filteredProducts = products.filter(item => item.availability === availablity)
            setFilteredProducts(filteredProducts)
        }
    }, [availablity])

    return (
        <RefreshOnMount>
            <div className='flex flex-col gap-y-2 pt-6'>
                <div className='grid grid-cols-[4fr_1fr_1fr] gap-x-6'>
                    <SearchPannel 
                        className='rounded-[4px] w-[85%]' 
                        placeholder='Пошук товарів...'
                        searchFunc={handleSearch}
                    />
                    <Select onValueChange={(val: ProductType) => setProductType(val)} value={productType}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Тип товару"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"all"}>Всі категорії</SelectItem>
                            <SelectItem value={$Enums.ProductType.spice}>Спеції</SelectItem>
                            <SelectItem value={$Enums.ProductType.mix}>Суміші прянощів</SelectItem>
                            <SelectItem value={$Enums.ProductType.flavor}>Прянощі</SelectItem>
                            <SelectItem value={$Enums.ProductType.supp}>Харчові добавки</SelectItem>
                            <SelectItem value={$Enums.ProductType.tea}>Чаї</SelectItem>
                            <SelectItem value={$Enums.ProductType.sweet}>Солодощі</SelectItem>
                            <SelectItem value={$Enums.ProductType.herb}>Трави</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(val: AvailablityStatus) => setAvailablity(val)} value={availablity}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"all"}>Будь-який статус</SelectItem>
                            <SelectItem value={$Enums.AvailablityStatus.IN_STOCK}>В наявності</SelectItem>
                            <SelectItem value={$Enums.AvailablityStatus.RUNS_OUT}>Закінчується</SelectItem>
                            <SelectItem value={$Enums.AvailablityStatus.OUT_OF_STOCK}>Немає в наявності</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableCaption>
                        {
                            products?.length === 0 ?
                                <EmptyList message='Список категорій порожній' /> :
                                <>Список усіх продуктів</>
                        }
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">№</TableHead>
                            <TableHead>Назва</TableHead>
                            <TableHead>Категорія</TableHead>
                            <TableHead>Ціна</TableHead>
                            <TableHead>Знижка</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className='text-right'>Редагувати</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredProducts?.map((item, i) => (
                                <ProductTableItem product={item} number={i+1} />
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </RefreshOnMount>
    )
}

export default ProductTable