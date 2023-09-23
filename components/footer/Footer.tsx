import Image from "next/image";
import { Icons } from "../ui/icons";
import Link from "next/link";
import { routes } from "@/lib/routes";
import prisma from "@/prisma/client";

export const revalidate = 3600

const Footer = async () => {
    const admin = await prisma.admin.findMany()
    return (
        <div className="border-customSecondary-foreground border-t-[1px] py-[16px] mt-[60px] md:mt-[120px]">
            <div className='container flex flex-col md:text-left items-center md:items-start text-center md:grid grid-cols-[1.5fr_1fr_1fr]'>
                <div className='flex flex-col max-w-[80%]'>
                    <Image 
                        src="/icon/logo.svg"
                        width={235}
                        height={100}
                        alt="logo"
                        className="w-[50vw] md:w-fit max-w-[200px]"
                    />
                    <p className='font-light text-customSecondary pb-4 hidden md:block'>
                        Широкий вибір унікальних смаків, які додадуть вашим стравам особливий шарм та неперевершений смаковий досвід.
                    </p>
                    <div className="hidden md:flex gap-x-4">
                        <Icons.youtube className="hover:opacity-70 duration-300"/>
                        <Icons.facefook className="hover:opacity-70 duration-300"/>
                        <Icons.tiktok className="hover:opacity-70 duration-300"/>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start gap-y-[0px] md:gap-y-1 pt-1 md:pt-4">
                    <h1 className="font-sofia font-semibold text-lg md:text-xl">Сторінки</h1>
                    <ul className="h-full flex justify-between flex-col text-customSecondary text-sm md:text-base w-fit">
                        <Link href={routes.home} className="cursor-pointer hover:opacity-70 duration-300">Головна</Link>
                        <Link href={routes.spices} className="cursor-pointer hover:opacity-70 duration-300">Асортимент</Link>
                        <Link href={routes.new} className="cursor-pointer hover:opacity-70 duration-300">Новинки</Link>
                        <Link href={routes.blog} className="cursor-pointer hover:opacity-70 duration-300">Блог</Link>
                    </ul>
                </div>

                <div className="flex flex-col items-center md:items-start gap-y-[0px] md:gap-y-2 pt-1 md:pt-4">
                    <h1 className="font-sofia font-semibold text-lg md:text-xl">Контакти</h1>
                    <ul className="flex flex-col text-customSecondary text-sm md:text-base w-fit">
                        <Link href={`tel:${admin[0]?.phone}`} className="cursor-pointer hover:opacity-70 duration-300">
                            {admin[0]?.phone}
                        </Link>
                    </ul>
                </div>

                <div className="md:hidden flex gap-x-4 pt-1">
                    <Link href={routes.social.youtube}><Icons.youtube className="w-[28px] md:w-[20px] hover:opacity-70 duration-300"/></Link>
                    <Link href={routes.social.facebook}><Icons.facefook className="w-[28px] md:w-[20px] hover:opacity-70 duration-300"/></Link>
                    <Link href={routes.social.tiktok}><Icons.tiktok className="w-[28px] md:w-[20px] hover:opacity-70 duration-300"/></Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;