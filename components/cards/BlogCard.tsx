import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'
import { Icons } from '../ui/icons'
import CustomButton from '../ui/custom/CustomButton'
import { Post } from '@prisma/client'
interface BlogCardProps {
  post: Post
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const videoId = post.link?.split("/")[3].split("?")[0]
  if (!post) return
  return (
    <Link href={post?.link!} target="_blank">
        <div className="productCard hover:scale select-none p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white">
            <div className="relative min-h-[140px] md:min-h-[200px] grid grid-cols-[150px_1fr] md:grid-cols-[200px_1fr] gap-x-4 text-customPrimary">
                <div className='relative rounded-[4px] overflow-hidden'>
                    <Image 
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        fill={true}
                        style={{objectFit: 'cover'}}
                        className='transition-transform duration-300'
                        alt={post?.title}
                    />
                    <Icons.play className='w-12 md:w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <div className='flex flex-col '>
                        <h1 className='font-sofia font-medium text-mainDark text-lg md:text-xl'>
                          {post?.title}
                        </h1>
                        <p className='text-customSecondary text-xs md:text-sm max-h-[56px] text-hidden'>
                          {post?.description}
                        </p>
                    </div>
                    <CustomButton 
                      variant="outline"
                      className='text-xs md:text-sm h-9'
                    >Детальніше</CustomButton>
                  </div>
            </div>
        </div>
    </Link>
  )
}

export default BlogCard