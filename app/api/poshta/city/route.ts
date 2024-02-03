import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const CityName = searchParams.get("city") as string | undefined;

        if(!CityName) {
            return NextResponse.json({ message: "City title was not provided"}, { status: 400, statusText: "Bad request"})
        }

        const cities = await fetch("https://api.novaposhta.ua/v2.0/json/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "apiKey": "bedf71c60d620c2550ac0015ac42478b",
                modelName: "Address",
                calledMethod: "searchSettlements",
                methodProperties: {
                    CityName,
                    Limit: "10",
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