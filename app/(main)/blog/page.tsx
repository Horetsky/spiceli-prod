import { FC } from 'react'

import Tabs from './(components)/Tabs'
import PageTitle from '@/components/titles/PageTitle'
import prisma from '@/prisma/client'

interface pageProps {
  
}
export const revalidate = 30

const page: FC<pageProps> = async ({}) => {
  const posts = await prisma.post.findMany()
  return (
   <div className='flex flex-col gap-y-[20px]'>
      <PageTitle 
        title="Блог"
        descr="Spiceli блог - це веселий та пізнавальний ресурс для людей, які цікавляться гастрономією, культурами різних народів та бажають поглибити свої знання про чудовий світ спецій."
      />
      <Tabs 
        posts={posts}
      />
   </div>
  )
}

export default page