import {FC} from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EmptyList from '../../(components)/EmptyList';
import PostTableItem from './PostTableItem';
import RefreshOnMount from "@/hooks/RefreshOnMount";
import { Post } from '@prisma/client';

interface CategoryTableProps {
    posts: Post[]
}

const PostTable: FC<CategoryTableProps> = ({ posts }) => {

    return (
        <RefreshOnMount>
            <Table>
                <TableCaption>
                    {
                        posts?.length === 0 ?
                            <EmptyList message='Список постів порожній' /> :
                            <>Список усіх постів</>
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">№</TableHead>
                        <TableHead>Назва</TableHead>
                        <TableHead>Категорія</TableHead>
                        <TableHead className='text-right'>Редагувати</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        posts?.map((item, i) => (
                            <PostTableItem post={item} number={i+1} />
                        ))
                    }
                </TableBody>
            </Table>
        </RefreshOnMount>
    )
}

export default PostTable