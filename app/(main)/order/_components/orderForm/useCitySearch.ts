import { useEffect, useState } from "react";
import { apiRequest } from "@/hooks/apiRequest";

export function useCitySearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [cities, setCities] = useState<{ label: string; value: string }[]>([])
    const [loading, setLoading] = useState<"loading" | "pending" | "error">("pending");

    useEffect(() => {
        const handler = setTimeout(async () => {
            await handleCitySearch()
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);
    async function handleCitySearch() {
        if(searchQuery.length < 2) return;
        setLoading("loading");

        apiRequest({
            url: `/api/poshta/city?city=${searchQuery}`,
            method: "GET"
        })
        .then(res =>
            // @ts-ignore
            res.data[0].Addresses.map(item => ({ label: item.Present, value: item.DeliveryCity }))
        )
        .then(res => setCities(res))
        .then(res => setLoading("pending"))
        .catch(e => setLoading("error"))
    }

    return {
        cities,
        loading,
        setSearchQuery,
    }
}