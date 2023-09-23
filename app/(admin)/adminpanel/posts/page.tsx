import { FC } from 'react'
import SectionTitle from '../(components)/SectionTitle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LuPlus } from 'react-icons/lu'
import PostTable from './(components)/PostTable'
import prisma from '@/prisma/client'

interface pageProps {
    
}

const page: FC<pageProps> = async ({}) => {
    const posts = await prisma.post.findMany({})
    return (
        <div>
            <SectionTitle title="Пости">
                <Link href="/adminpanel/posts/create">
                  <Button variant="admin">
                    <LuPlus className="text-xl" />
                    Додати
                  </Button>
                </Link>
            </SectionTitle>
            <PostTable posts={posts}/>
        </div>
    )
}

export default page