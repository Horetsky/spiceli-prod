import { FC } from 'react'

import SectionTitle from '@/components/titles/SectionTitle'
import Tabs from '@/components/tabs/Tabs'

import prisma from '@/prisma/client'
import EmptyList from '@/components/ui/custom/EmptyList'

interface TasteProps {
  
}

const Taste: FC<TasteProps> = async ({}) => {
  const category = await prisma.category.findMany({
    include: {
      products: {
        include: {
          images: true
        }
      }
    }
  })
  const tabs = category.filter(item => item.products.length > 0)
  return (
    <div>
      <SectionTitle>Розкрий смак улюблених страв</SectionTitle>
      {
        tabs.length > 0 ?
          <Tabs tabs={tabs}/> : <EmptyList message='Тут поки що порожньо' />
      }
        
              
    </div>
  )
}



export default Taste