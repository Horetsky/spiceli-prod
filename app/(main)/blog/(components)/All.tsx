import { FC } from 'react'
import BlogCard from '@/components/cards/BlogCard'
import { Post } from '@prisma/client'
import BlogGrid from '@/components/layouts/BlogGrid'
import EmptyList from '@/components/ui/custom/EmptyList'
interface AllProps {
  data: Post[]
}

const All: FC<AllProps> = ({ data }) => {
  return (
      <BlogGrid>
        {
          data?.length === 0 &&
            <EmptyList message='Список постів порожній' />
        }
        {
          data?.map(item => (
            <BlogCard
              key={item?.id}
              post={item} 
            />
          ))
        }
      </BlogGrid>
  )
}

export default All