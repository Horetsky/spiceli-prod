import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const CityRef = searchParams.get("city") as string | undefined;

        if(!CityRef) {
            return NextResponse.json({ message: "City ref was not provided"}, { status: 400, statusText: "Bad request"})
        }

        const cities = await fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: "bedf71c60d620c2550ac0015ac42478b",
                modelName: "Address",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef,
                    Limit: "50",
                    TypeOfWarehouseRef: "841339c7-591a-42e2-8233-7a0a00f0ed6f"
                }
            })
        })

        const res = await cities.json();
        return NextResponse.json({ data: res, message: "Success" }, { status: 200, statusText: "OK" })
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({message: e.message}, {
            status: 500
        })
    }
}