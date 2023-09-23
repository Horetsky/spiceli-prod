import { FC } from 'react'

import ProductCard from '@/components/cards/ProductCard'
import ProductGrid from '@/components/layouts/ProductGrid'
import PageTitle from '@/components/titles/PageTitle'
import prisma from '@/prisma/client'

interface pageProps {
  
}

export const revalidate = 30

const page: FC<pageProps> = async ({}) => {
  const herbs = await prisma.products.findMany({
    where: {
      type: "herb"
    },
    include: {
      images: true
    }
  })
  return (
    <div>
      <PageTitle 
        title="Трави"
        descr="Ми пропонуємо широкий вибір лікарських трав, що допоможуть вам зберегти та підтримати ваше здоров'я і благополуччя."
      />
      <ProductGrid>
          {
            herbs?.map(item => (
              <ProductCard
                product={item}
              />
            ))
          }
      </ProductGrid>
    </div>
  )
}

export default page