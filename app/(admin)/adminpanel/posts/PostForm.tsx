"use client"

import { FC } from 'react'
import SectionTitle from '../(components)/SectionTitle'
import { Button } from '@/components/ui/button'
import UIForm from './(components)/UIForm';
import {
    LuX,
    LuSave
} from "react-icons/lu";

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from './formSchema';
import type { IPostSchema } from './formSchema';

import { toast } from 'react-hot-toast';
import { apiRequest } from '@/hooks/apiRequest';

import { Post } from '@prisma/client';
import { $Enums } from '@prisma/client';

interface PostFormProps {
    post?: Post | null
}

const PostForm: FC<PostFormProps> = ({ post }) => {
    const router = useRouter();
    const isUpdate = !!post;

    const initialValues: IPostSchema = {
        type: $Enums.PostType.video,
        title: "",
        description: "",
        link: ""
    }
    const defaultValues: IPostSchema = isUpdate ? {
        postId: post.id,
        type: post.type,
        title: post.title,
        description: post.description,
        link: post.link!
    } : initialValues
    const form = useForm<IPostSchema>({
        resolver: zodResolver(postSchema),
        defaultValues,
        mode: "onChange"
    })

    const statusMessages = {
        loading: isUpdate ? "Збереження змін..." : "Створення нового поста...",
        success: isUpdate ? "Пост оновлено" : "Пост створено",
        error: "Помилка"
      }
    async function savePost (data: IPostSchema) {
        try {
            toast.promise(apiRequest({
                url: "/api/posts",
                method: isUpdate ? "PUT" : "POST",
                data
            }), {
                loading: statusMessages.loading,
                success: () => {
                  router.push('/adminpanel/posts')
                  form.reset()
                  return statusMessages.success
                },
                error: statusMessages.error
            })
        } catch (e) {
            console.log(e);
        }
    }

    const handleReset = () => {
        form.reset()
        router.push('/adminpanel/posts')
    }
    return (
        <div>
            <SectionTitle title='Створення товару'>
                <Button variant="admin"
                  onClick={form.handleSubmit(savePost)}
                >
                    <LuSave className="text-lg" />
                    Зберегти
                </Button>
                <Button variant="admin" className='h-10 w-10 p-1 hover:bg-red-500'
                  onClick={handleReset}
                >
                    <LuX className='text-lg' />
                </Button>
            </SectionTitle>
            <div className='pt-6'>
                <UIForm form={form} />
            </div>
        </div>
      )
}

export default PostForm