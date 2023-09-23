import { NextResponse } from "next/server";

import type { IPostSchema } from "@/app/(admin)/adminpanel/posts/formSchema";

import prisma from "@/prisma/client";

export async function POST(req: Request) {
    try {
        const body: IPostSchema = await req.json()
        if (!body) return  NextResponse.json({message: "Body is required"}, {
            status: 500
        })

        const newPost = await prisma.post.create({
            data: {
               ...body
            }
        })
        return NextResponse.json({message: 'Пост створено', newPost}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}


export async function PUT(req: Request) {
    try {
        const body: IPostSchema = await req.json()
        if (!body) return  NextResponse.json({message: "Body is required"}, {
            status: 500
        })

        const {
            postId,
            title,
            description,
            type,
            link
        } = body;

        const newPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                description,
                type,
                link
            }
        })
        return NextResponse.json({message: 'Пост створено', newPost}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}

export async function DELETE(req: Request) {
    try {
        const body: IPostSchema = await req.json()

        const {
            postId
        } = body;

        const newPost = await prisma.post.delete({
            where: {
                id: postId
            },
        })
        return NextResponse.json({message: 'Продукт створено', newPost}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}