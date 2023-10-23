'use client'

import React, {FC} from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuPencil } from 'react-icons/lu';
import DeleteAlert from '../../(components)/DeleteAlert';

import { apiRequest } from '@/hooks/apiRequest';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Products } from '@prisma/client';
import { $Enums } from '@prisma/client';

interface ProductTableItemProps {
    product: Products,
    number: number
}

const ProductTableItem: FC<ProductTableItemProps> = ({product, number}) => {
    const router = useRouter()
    async function handleDelete (id: string) {
        try {
            toast.promise(apiRequest({
                url: "/api/product",
                method: "DELETE",
                data: {
                    productId: id
                }
            }), {
                loading: "Видалення",
                success: () => {
                    router.refresh()
                    return "Товар успішно видалено"
                },
                error: "Помилка"
            }
            )
        } catch (e: any) {
            console.log(e);
        }
    }
    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell className='w-[250px]'>
                <div className='w-full rounded-[4px] text-center text-white'
                    style={
                        {
                            backgroundColor: 
                                product.type === $Enums.ProductType.spice 
                                || product.type === $Enums.ProductType.mix
                                || product.type === $Enums.ProductType.flavor
                                || product.type === $Enums.ProductType.supp
                                ? "#CE5959" :
                            product.type === $Enums.ProductType.herb ? "#9EB384" :
                            product.type === $Enums.ProductType.tea ? "#FFCC70" : "#E95793"
                        }
                    }
                >
                    {
                        product.type === $Enums.ProductType.spice ? <>Приправа</> :
                        product.type === $Enums.ProductType.mix ? <>Суміш прянощів</> :
                        product.type === $Enums.ProductType.flavor ? <>Прянощі</> :
                        product.type === $Enums.ProductType.supp ? <>Харчові добавки</> :
                        product.type === $Enums.ProductType.herb ? <>Трава</> : 
                        product.type === $Enums.ProductType.tea ? <>Чай</> : <>Солодощі</>
                    }
                </div>
            </TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
                {
                    product.discount ?? <>—</>
                }
            </TableCell>
            <TableCell className='w-[250px]'>
                <div className='w-full rounded-[4px] text-center text-white'
                    style={{backgroundColor: 
                            product.availability === $Enums.AvailablityStatus.IN_STOCK ? "#1E8D5F" :
                            product.availability === $Enums.AvailablityStatus.RUNS_OUT ? "#FFBD49" : "#C31522"
                        }}
                >
                    {
                        product.availability === $Enums.AvailablityStatus.IN_STOCK ? "В наявності" :
                        product.availability === $Enums.AvailablityStatus.RUNS_OUT ? "Закінчується" : "Немає в наявності"
                    }
                </div>
            </TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/products/${product.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuPencil />
                    </Button>
                </Link>
                <DeleteAlert action={() => handleDelete(product.id)}/>
            </TableCell>
        </TableRow>
    );
};

export default ProductTableItem;