import { FC } from 'react'
import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import PageTitle from '@/components/titles/PageTitle'
import prisma from '@/prisma/client'
interface pageProps {
  
}

export const revalidate = 30

const page: FC<pageProps> = async ({}) => {
  const spices = await prisma.products.findMany({
    where: {
      type: "spice"
    },
    include: {
      images: true
    }
  })
  return (
    <div>
      <PageTitle 
        title="Спеції"
        descr="Ми пропонуємо широкий вибір унікальних смаків, які додадуть вашим стравам особливий шарм та неперевершений смаковий досвід."
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