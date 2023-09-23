import { NextResponse } from "next/server";

import type { IProductSchema } from "@/app/(admin)/adminpanel/products/formSchema";
import type { ImageInput } from "@/app/(admin)/adminpanel/products/formSchema";
import prisma from "@/prisma/client";

export async function POST(req: Request) {
    try {
        const body: IProductSchema = await req.json()
        if (!body) return  NextResponse.json({message: "Body is required"}, {
            status: 500
        })

        const {
            name,
            description,
            features,
            type,
            availability,
            isNew,
            isBestseller,
            price,
            discount,
            category,
            images
        } = body;

        const newProduct = await prisma.products.create({
            data: {
                name,
                description,
                features,
                type,
                availability,
                isNew,
                isBestseller,
                price,
                discount,
                categoryId: category,
                images: {
                    createMany: {
                        data: [...images.map((img: ImageInput, i) => ({
                            url: img.url,
                            name: `${name} ${i+1}`
                        }))]
                    }
                }
            }
        })
        return NextResponse.json({message: 'Продукт створено', newProduct}, {
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
        const body: IProductSchema = await req.json()
        if (!body) return  NextResponse.json({message: "Body is required"}, {
            status: 500
        })

        const {
            productId,
            name,
            description,
            features,
            type,
            availability,
            isNew,
            isBestseller,
            price,
            discount,
            category,
            images
        } = body;

        const newProduct = await prisma.products.update({
            where: {
                id: productId
            },
            data: {
                name,
                description,
                features,
                type,
                availability,
                isNew,
                isBestseller,
                price,
                discount,
                categoryId: category,
                images: {
                    deleteMany: {},
                    createMany: {
                        data: [...images.map((img: ImageInput, i) => ({
                            url: img.url,
                            name: `${name} ${i+1}`
                        }))]
                    }
                }
            }
        })
        return NextResponse.json({message: 'Продукт створено', newProduct}, {
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
        const body: IProductSchema = await req.json()

        const {
            productId
        } = body;

        const newProduct = await prisma.products.delete({
            where: {
                id: productId
            },
        })
        return NextResponse.json({message: 'Продукт створено', newProduct}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}
export async function GET(req: Request) {
    try {
        const products = await prisma.products.findMany()
        return NextResponse.json({data: products}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}
