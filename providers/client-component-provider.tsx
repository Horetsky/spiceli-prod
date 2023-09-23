"use client"

import { FC } from 'react'
import { useEffect, useState } from "react"

interface clientProviderProps {
  children: React.ReactNode
}

const ClientProvider: FC<clientProviderProps> = ({ children }) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    return children
}

export default ClientProvider