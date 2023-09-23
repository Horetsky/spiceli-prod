import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io"
import { routes } from "@/lib/routes";
import prisma from "@/prisma/client";

import { 
    HeaderSidebar,
    HeaderSearchBar
} from "./HeaderAssets";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export const revalidate = 3600

const Header = async () => {
    const admin = await prisma.admin.findMany()
    

    return (
        <div className="w-full">
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
                <HeaderSearchBar />
                <HeaderSidebar admin={admin} />
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
                    <div className="flex flex-col justify-self-end text-right">
                        <Link href={`tel:${admin?.[0].phone}`} className="font-semibold text-base">
                            {
                                admin?.[0].phone
                            }
                        </Link>
                        <span className="-mt-2 font-light text-sm text-customSecondary">5 днів на тиждень з 7:00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Header;