import { FC } from 'react'

import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import PageTitle from '@/components/titles/PageTitle'
import prisma from '@/prisma/client'

interface pageProps {
  
}

export const revalidate = 50

const page: FC<pageProps> = async ({}) => {
  const discounts = await prisma.products.findMany({
    include: {
      images: true
    }
  })
  return (
    <div>
      <PageTitle 
        title="Знижки"
        descr="Переглядайте знижки та акційні пропозиції на весь асортимент, щоб зекономити гроші та отримати більше за менше."
      />
      <ProductGrid>
          {
            discounts?.filter(item => item.discount).map(item => (
              <ProductCard
                key={item?.id}
                product={item}
              />
            ))
          }
      </ProductGrid>
    </div>
  )
}

export default page