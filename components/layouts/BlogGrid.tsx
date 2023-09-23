import { FC, ReactNode } from 'react'
import "./style.css"
interface BlogGridProps {
  children: ReactNode
}

const BlogGrid: FC<BlogGridProps> = ({ children }) => {
  return (
    <div className='container pt-0 md:pt-6 blog-grid gap-y-4'>
        { children }
    </div>
  )
}

export default BlogGrid