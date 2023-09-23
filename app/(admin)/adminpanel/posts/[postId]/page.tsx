import { FC } from 'react'
import PostForm from '../PostForm'
import prisma from '@/prisma/client'

interface pageProps {
    params: {
        postId: string
    }
}

const page: FC<pageProps> = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    })
    return <PostForm post={post}/>
}

export default page