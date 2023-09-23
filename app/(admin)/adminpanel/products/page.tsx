import { FC } from 'react'

import SectionTitle from '../(components)/SectionTitle'
import { Button } from '@/components/ui/button'
import { LuPlus } from "react-icons/lu"
import Link from 'next/link'
import ProductTable from './(components)/ProductTable'
import prisma from '@/prisma/client'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
  const products = await prisma.products.findMany({})
  return (
    <div>
      <SectionTitle title='Товари'>
        <Link href="/adminpanel/products/create">
          <Button variant="admin">
            <LuPlus className="text-xl" />
            Додати
          </Button>
        </Link>
      </SectionTitle>
      <ProductTable products={products} />
    </div>
  )
}

export default page