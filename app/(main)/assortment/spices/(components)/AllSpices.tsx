import { FC } from 'react'

import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import { ITabViewProps } from './type'

const AllSpices: FC<ITabViewProps> = ({ products }) => {
    return (
        <ProductGrid>
            {
                products.map(item => (
                    <ProductCard
                        key={item?.id}
                        product={item}
                    />
                ))
            }
        </ProductGrid>
    )
}

export default AllSpices