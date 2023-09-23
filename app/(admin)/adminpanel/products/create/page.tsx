import { FC } from 'react'
import prisma from '@/prisma/client'

import ProductForm from "../ProductForm"

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
    const category = await prisma.category.findMany({})
    return <ProductForm category={category}/>
}

export default page