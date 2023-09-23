import { FC } from 'react'
import prisma from '@/prisma/client'
import ProductForm from '../ProductForm'
interface pageProps {
  params: {
    productId: string
  }
}

const page: FC<pageProps> = async ({ params }) => {
    const category = await prisma.category.findMany({})
    const product = await prisma.products.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true
      }
    })
    return <ProductForm category={category} product={product}/>
}

export default page