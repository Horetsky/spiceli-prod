import { FC } from 'react'
import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import PageTitle from '@/components/titles/PageTitle'
import prisma from '@/prisma/client'
interface pageProps {
  
}

export const dynamic = 'force-dynamic'

const page: FC<pageProps> = async ({}) => {
  const spices = await prisma.products.findMany({
    where: {
      type: "tea"
    },
    include: {
      images: true
    }
  })
  return (
    <div>
      <PageTitle 
        title="Карпацькі чаї"
        descr="Ми пропонуємо широкий вибір унікальних чаїв, які задовольнять найвибагливіших шанувальників чаю з різних куточків світу."
      />
      <ProductGrid>
          {
            spices?.map(item => (
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