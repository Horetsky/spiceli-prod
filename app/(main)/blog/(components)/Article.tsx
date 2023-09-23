import EmptyList from '@/components/ui/custom/EmptyList'
import { Post } from '@prisma/client'
import { FC } from 'react'

interface ArticleProps {
  data: Post[]
}

const Article: FC<ArticleProps> = ({}) => {
  return (
    <>
      <EmptyList message='Список cтаттей порожній' />
    </>
  )
}

export default Article