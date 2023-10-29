import { FC } from 'react'

import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import PageTitle from '@/components/titles/PageTitle'
import prisma from '@/prisma/client'

interface pageProps {
  
}

export const dynamic = 'force-dynamic'

const page: FC<pageProps> = async ({}) => {
  const news = await prisma.products.findMany({
    where: {
      isNew: true
    },
    include: {
      images: true
    }
  })
  return (
    <div>
      <PageTitle 
        title="Новинки"
        descr="Переглядайте найсвіжіші поступлення або оновлення асортименту, щоб завжди бути в курсі останніх трендів і новинок."
      />
      <ProductGrid>
          {
            news?.map(item => (
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