"use client"

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'
import { signOut } from "next-auth/react"
import { usePathname } from 'next/navigation'

import { 
    LuLayoutGrid,
    LuSettings,
    LuLogOut
} from "react-icons/lu"

import "./style.css"
interface SidebarProps {
  
}

enum MenuItems {
    dashboard = "dashboard",
    products = "products",
    posts = "posts",
    settings = "settings",
}

type IMenuItem = keyof typeof MenuItems

const Sidebar: FC<SidebarProps> = ({}) => {
  const path = usePathname().split("/")[2]
  const [activeTab, setActiveTab] = useState<IMenuItem>(MenuItems.dashboard)
  useEffect(() => {
    switch (path) {
        case MenuItems.dashboard:
            setActiveTab(MenuItems.dashboard)
            break;
        case MenuItems.products:
            setActiveTab(MenuItems.products)
            break;
        case MenuItems.settings:
            setActiveTab(MenuItems.settings)
            break;
        case MenuItems.posts:
            setActiveTab(MenuItems.posts)
            break;
        default:
            setActiveTab(MenuItems.dashboard)
            break;
    }
  }, [path]);

  const menuItemStyles = "flex gap-x-[8px] rounded-[4px] text-customSecondary items-center p-[6px] hover:bg-customSecondary-foreground duration-300"

  return (
    <div className='grid grid-rows-[1fr_9fr_1fr] pb-4 max-h-[100vh]'>
        <div className='max-h-[77.41px] flex items-center'>
            
            <Image 
                src="/icon/logo.svg"
                width={185}
                height={100}
                alt="logo"
            />
        </div>

        <ul className='flex flex-col gap-y-[8px] select-none'>
            {/* <Link href="/adminpanel/dashboard" className={cn(menuItemStyles, activeTab === MenuItems.dashboard && 'adminMenuActive')}>
                <LuLayoutGrid className="text-2xl" />
                <span className='font-semibold text-xl'>Основне</span>
            </Link> */}

            <Link href="/adminpanel/products" className={cn(menuItemStyles, activeTab === MenuItems.products && 'adminMenuActive')}>
                <Icons.lib />
                <span className='font-semibold text-xl'>Товари</span>
            </Link>

            <Link href="/adminpanel/posts" className={cn(menuItemStyles, activeTab === MenuItems.posts && 'adminMenuActive')}>
                <Icons.blog />
                <span className='font-semibold text-xl'>Блог</span>
            </Link>
        </ul>

        <ul className='flex flex-col gap-y-[8px] select-none'>
            <Link href="/adminpanel/settings" className={cn(menuItemStyles, activeTab === MenuItems.settings && 'adminMenuActive')}>
                <LuSettings className="text-2xl" />
                <span className='font-semibold text-xl'>Налаштування</span>
            </Link>
            <li className={cn(menuItemStyles, 'hover:opacity-70 hover:bg-transparent')}
                onClick={() => signOut()}
            >
                <LuLogOut className="text-2xl" />
                <span className=' font-semibold text-xl'>Вийти</span>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar