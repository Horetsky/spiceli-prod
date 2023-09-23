'use client'

import React, {FC} from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuPencil } from 'react-icons/lu';
import DeleteAlert from '../../(components)/DeleteAlert';

import { apiRequest } from '@/hooks/apiRequest';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Post } from '@prisma/client';
import { $Enums } from '@prisma/client';

interface PostTableItemProps {
    post: Post,
    number: number
}

const PostTableItem: FC<PostTableItemProps> = ({post, number}) => {
    const router = useRouter()
    async function handleDelete (id: string) {
        try {
            toast.promise(apiRequest({
                url: "/api/posts",
                method: "DELETE",
                data: {
                    postId: id
                }
            }), {
                loading: "Видалення...",
                success: () => {
                    router.refresh()
                    return "Пост успішно видалено"
                },
                error: "Помилка"
            }
            )
        } catch (e: any) {
            console.log(e);
        }
    }
    return (
        <TableRow>
            <TableCell className="font-medium">{number}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>
                <div className='w-20 rounded-[4px] text-center text-white'
                    style={{backgroundColor: post.type === $Enums.PostType.video ? "#9EB384" : "#CE5959"}}
                >
                    {
                        post.type === $Enums.PostType.video ?
                            <>Відео</> : <>Стаття</>
                    }
                </div>
            </TableCell>
            <TableCell className='flex gap-x-2 float-right'>
                <Link href={`/adminpanel/posts/${post.id}`}>
                    <Button className='h-10 w-10 p-1'>
                        <LuPencil />
                    </Button>
                </Link>
                <DeleteAlert action={() => handleDelete(post.id)}/>
            </TableCell>
        </TableRow>
    );
};

export default PostTableItem;