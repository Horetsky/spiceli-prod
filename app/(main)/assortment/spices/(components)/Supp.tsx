import { FC } from 'react'

import { $Enums } from '@prisma/client'
import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import { ITabViewProps } from './type'

const Supp: FC<ITabViewProps> = ({ products }) => {
    const displayedProducts = products.filter(item => item.type === $Enums.ProductType.supp)
    return (
        <ProductGrid>
            {
                displayedProducts.map(item => (
                    <ProductCard
                        key={item.id}
                        product={item}
                    />
                ))
            }
        </ProductGrid>
    )
}

export default Supp