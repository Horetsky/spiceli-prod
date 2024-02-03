import { useEffect, useState } from "react";
import { apiRequest } from "@/hooks/apiRequest";

export function useWarehouseSearch() {
    const [warehouses, setWarehouses] = useState<{ label: string; value: string }[]>([])
    const [loading, setLoading] = useState<"loading" | "pending" | "error">("pending");

    async function fetchWarehouses(cityRef: string | undefined) {
        if(!cityRef || cityRef?.length < 2) return;
        setLoading("loading");
        apiRequest({
            url: `/api/poshta/warehouse?city=${cityRef}`,
            method: "GET"
        })
        .then(res =>
            // @ts-ignore
            res.data.map(item => ({ label: item.Description, value: item.Ref }))
        )
        .then(res => setWarehouses(res))
        .then(res => setLoading("pending"))
        .catch(e => setLoading("error"))
    }

    return {
        warehouses,
        loading,
        fetchWarehouses
    }
}