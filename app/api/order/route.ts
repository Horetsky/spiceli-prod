import { DBOrder } from "@/app/(main)/order/_components/orderForm/formSchema";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

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