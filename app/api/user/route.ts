import { NextResponse } from "next/server";

import type { ISettingsSchema } from "@/app/(admin)/adminpanel/settings/formSchema";
import prisma from "@/prisma/client";

export async function GET(req: Request) {
    try {
        const newUser = await prisma.admin.findMany({})
        return NextResponse.json({data: newUser[0]}, {
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
        const body: ISettingsSchema = await req.json()
        if (!body) return  NextResponse.json({message: "Body is required"}, {
            status: 500
        })

        const {
            userId,
            name,
            surname,
            password,
            phone
        } = body;

        const newUser = await prisma.admin.update({
            where: {
                id: userId
            },
            data: {
                name,
                surname,
                password,
                phone
            }
        })
        return NextResponse.json({message: 'Продукт створено', newUser}, {
            status: 201
        })
    } catch (e: any) {
        console.log(e);
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}

