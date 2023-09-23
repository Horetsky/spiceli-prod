import {FC} from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EmptyList from '../../(components)/EmptyList';
import ProductTableItem from './ProductTableItem';
import RefreshOnMount from "@/hooks/RefreshOnMount";
import { Products } from '@prisma/client';

interface CategoryTableProps {
    products: Products[]
}

const ProductTable: FC<CategoryTableProps> = ({ products }) => {

    return (
        <RefreshOnMount>
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
                        products?.map((item, i) => (
                            <ProductTableItem product={item} number={i+1} />
                        ))
                    }
                </TableBody>
            </Table>
        </RefreshOnMount>
    )
}

export default ProductTable