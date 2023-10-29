import { FC } from 'react'

import Buy from '../../(components)/Buy'
import SectionTitle from '@/components/titles/SectionTitle'
import MainCardSlider from '@/components/layouts/MainCardSlider'
import prisma from '@/prisma/client'
import { FullProduct } from '@/types/types'

interface pageProps {
  params: {
    slug: string
  }
}

export const revalidate = 50
export const dynamicParams = true

const page: FC<pageProps> = async ({ params }) => {
  const product = await prisma.products.findUnique({
    where: {
      id: params.slug
    },
    include: {
      images: true
    }
  }) as unknown as FullProduct

  const getCategoty = async (id: string) => {
    const category =  await prisma.category.findUnique({
      where: {
        id
      }
    })
    return category
  }
  const category = product?.id ? await getCategoty(product?.id) : null

  const products = await prisma.products.findMany({
    where: {
      type: "spice",
      NOT: {
        id: product.id
      }
    },
    include: {
      images: true
    }
  })

  const admin = await prisma.admin.findMany()
  return (
    <div className='sectionGap'>
      <Buy product={product} category={category} admin={admin[0]}/>
      <div className='md:container'>
        {
          products.length > 0 &&
            <>
              <SectionTitle align="left" className='container pb-0'>Також рекомендуємо</SectionTitle>
              <MainCardSlider 
                slides={
                  products.slice(0, 4)
                }
              />
            </>
        }
      </div>
    </div>
  )
}

export default page