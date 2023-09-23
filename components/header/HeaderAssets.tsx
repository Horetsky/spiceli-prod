"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import SearchBar from "../searchBar/SearchBar"

import useNotAvatible from "@/hooks/useNotAvatible"
import { apiRequest } from "@/hooks/apiRequest"
import type { searchFunc } from "@/hooks/useDebounceSearch"
import useDebounceSearch from "@/hooks/useDebounceSearch"
import { Products } from "@prisma/client"

import { Icons } from "../ui/icons"

export const HeaderSidebar = ({ admin }: {admin: any}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false) // Is sidebar open
    const { notAvatibleAllert } = useNotAvatible()
    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (isOpen) document.body.classList.add("noScroll")
        else document.body.classList.remove("noScroll")
    }, [isOpen])
    
    const handleResize = () => {
        if (window.innerWidth > 768) setIsOpen(false)
    }

    return (
        <>
            <Sidebar isOpen={isOpen} admin={admin} onClick={() => setIsOpen(false)}/>
            <div className="hidden md:block" onClick={() => notAvatibleAllert()} >
                <Icons.cart className="w-[40px] hover:opacity-70 duration-300 cursor-pointer" />
            </div>
            <div className="hidden md:block" onClick={() => notAvatibleAllert()} >
                <Icons.profile className="w-[40px] hover:opacity-70 duration-300 cursor-pointer" />
            </div>
            <div className="justify-self-end block md:hidden" onClick={() => setIsOpen(!isOpen)}>
                <Icons.menu />
            </div>
        </>
    )
}

export const HeaderSearchBar = () => {
    const searchProduct: searchFunc<Products> = async (searchTerm: string) => {
        const result = await apiRequest({
            url: "/api/product",
            method: "GET"
        })
        
        return result.filter((item: Products) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }


    const { handleSearch, loadingStatus, searchResult } = useDebounceSearch<Products>(searchProduct)
    return (
        <SearchBar 
            searchFunc={(request) => handleSearch(request)} 
            loading={loadingStatus}
            searchResults={searchResult}
            placeholder="Знайти спеції..." 
            className="rounded-full hidden md:flex" 
        />
    )
}