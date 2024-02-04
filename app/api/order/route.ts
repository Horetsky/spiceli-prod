import { DBOrder } from "@/app/(main)/order/_components/orderForm/formSchema";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { OrderStatus } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const body: DBOrder = await req.json();
        if(!body) {
            return NextResponse.json({ message: "Invalid data!"}, { status: 400, statusText: "Bad request"} )
        }

        await prisma.order.create({
            data: {
                data: JSON.stringify(body)
            }
        })
        
        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Error" }, { status: 500, statusText: "Internal Server Error" })
    }
}

export async function PUT(req: Request) {
    try {
        const body: DBOrder & { id: string } = await req.json();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") as OrderStatus | undefined;

        const {
            id,
            ...order
        } = body
        if(!id) {
            return NextResponse.json({ message: "Invalid data!"}, { status: 400, statusText: "Bad request"} )
        }

        await prisma.order.update({
            where: { id },
            data: {
                ...order,
                status
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Error" }, { status: 500, statusText: "Internal Server Error" })
    }
}

export async function DELETE(req: Request) {
    try {
        const body: DBOrder & { id: string } = await req.json();
        const { id } = body
        if(!id) {
            return NextResponse.json({ message: "Invalid data!"}, { status: 400, statusText: "Bad request"} )
        }

        await prisma.order.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Error" }, { status: 500, statusText: "Internal Server Error" })
    }
}