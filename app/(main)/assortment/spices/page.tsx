import { FC } from 'react'
import ProductGrid from '@/components/layouts/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import PageTitle from '@/components/titles/PageTitle'
import prisma from '@/prisma/client'
import ProductTabs from './(components)/ProductTabs'
interface pageProps {
  
}

export const revalidate = 30

const page: FC<pageProps> = async ({}) => {
  const products = await prisma.products.findMany({
    where: {
      type: {
        notIn: ["sweet", "tea", "herb"]
      }
    },
    include: {
      images: true
    }
  })
  return (
    <div className='flex flex-col gap-y-[20px]'>
      <PageTitle 
        title="Спеції"
        descr="Ми пропонуємо широкий вибір унікальних смаків, які додадуть вашим стравам особливий шарм та неперевершений смаковий досвід."
      />
      <ProductTabs products={products} />
    </div>
  )
}

export default page