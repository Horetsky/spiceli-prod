"use client"

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../searchBar/SearchBar";
import { Icons } from "../ui/icons";
import { IoMdArrowDropdown } from "react-icons/io"
import useNotAvatible from "@/hooks/useNotAvatible";
import { routes } from "@/lib/routes";
import { apiRequest } from "@/hooks/apiRequest";

import useDebounceSearch, { searchFunc } from "@/hooks/useDebounceSearch";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Sidebar from "./Sidebar";
import useAdminRequest from "@/hooks/useAdminRequest";
import { Products } from "@prisma/client";

export const revalidate = 3600

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false) // is sidebar open
    const admin = useAdminRequest()
    const { notAvatibleAllert } = useNotAvatible()

    const searchProduct: searchFunc<Products> = async (searchTerm: string) => {
        const result = await apiRequest({
            url: "/api/product",
            method: "GET"
        })
        
        return result.filter((item: Products) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }


    const { handleSearch, loadingStatus, searchResult } = useDebounceSearch<Products>(searchProduct)
    
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
        <div className="w-full">
            <Sidebar isOpen={isOpen} admin={admin} onClick={() => setIsOpen(false)}/>
            <div className= "container grid gap-x-[1rem] justify-items-center grid-cols-[1fr_1fr] md:grid-cols-[0.5fr_2fr_0.1fr_0.1fr] items-center">
                <Link href={routes.home} className="justify-self-start">
                    <Image 
                        src="/icon/logo.svg"
                        width={235}
                        height={100}
                        title="spiceli"
                        className="min-w-[130px]"
                        alt="logo"
                    />
                </Link>
                <SearchBar 
                    searchFunc={(request) => handleSearch(request)} 
                    loading={loadingStatus}
                    searchResults={searchResult}
                    placeholder="Знайти спеції..." 
                    className="rounded-full hidden md:flex" 
                />
                <div className="hidden md:block" onClick={() => notAvatibleAllert()} >
                    <Icons.cart className="w-[40px] hover:opacity-70 duration-300 cursor-pointer" />
                </div>
                <div className="hidden md:block" onClick={() => notAvatibleAllert()} >
                    <Icons.profile className="w-[40px] hover:opacity-70 duration-300 cursor-pointer" />
                </div>
                <div className="justify-self-end block md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Icons.menu />
                </div>
            </div>
            <div className="hidden md:block border-customSecondary-foreground border-y-[1px] py-[16px]">
                <div className="container grid grid-cols-[1fr_1.5fr] items-center">
                    <ul className="hover:[&>a]:text-customAccent [&>a]:cursor-pointer [&>a]:duration-200 hover:[&>li]:text-customAccent [&>li]:cursor-pointer [&>li]:duration-200 hover-text flex gap-x-[70px] font-semibold text-base">
                        <Link href={routes.home}>
                            Головна
                        </Link>
                        <DropdownMenu>
                        <DropdownMenuTrigger className="hover:[&>li]:text-customAccent [&>li]:cursor-pointer [&>li]:duration-200">
                            <li className="flex items-center gap-x-[3px]">
                                <span>Асортимент</span>
                                <IoMdArrowDropdown className="mt-1"/>
                            </li>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href={routes.spices}>
                                <DropdownMenuItem>Спеції</DropdownMenuItem>
                            </Link>
                            <Link href={routes.herbs}>
                                <DropdownMenuItem>Трави</DropdownMenuItem>
                            </Link>
                            <Link href={routes.teas}>
                                <DropdownMenuItem>Чаї</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <li className="relative">
                            <Link href={routes.new}>
                                Новинки
                            </Link>
                        </li>
                        <Link href={routes.blog}>
                            Блог
                        </Link>
                    </ul>
                    {
                        admin &&
                            <div className="flex flex-col justify-self-end text-right">
                                <Link href={`tel:${admin?.phone}`} className="font-semibold text-base">
                                    {admin?.phone}
                                </Link>
                                <span className="-mt-2 font-light text-sm text-customSecondary">5 днів на тиждень з 7:00</span>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};



export default Header;