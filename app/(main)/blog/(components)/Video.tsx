import { Post } from '@prisma/client'
import { FC } from 'react'
import BlogCard from '@/components/cards/BlogCard'
import BlogGrid from '@/components/layouts/BlogGrid'
import EmptyList from '@/components/ui/custom/EmptyList'
interface VideoProps {
  data: Post[]
}

const Video: FC<VideoProps> = ({ data}) => {
  return (
    <BlogGrid>
      {
          data?.length === 0 &&
            <EmptyList message='Список відео порожній' />
      }
      {
          data?.map(item => (
            <BlogCard post={item} />
          ))
      }
    </BlogGrid>
  )
}

export default Video