"use client"

import { useEffect, useState } from "react";
import { apiRequest } from "./apiRequest";

export default function useAdminRequest () {
    const [admin, setAdmin] = useState<{
        name: string,
        phone: string
    } | null>(null)

    useEffect(() => {
        apiRequest({url: "/api/user", method: "GET"})
            .then(res => setAdmin(res))
            .catch(() => setAdmin(null))
    }, [])

    return admin
}