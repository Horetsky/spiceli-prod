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
    orders = "orders",
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
        case MenuItems.orders:
            setActiveTab(MenuItems.orders)
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
            <Link href="/adminpanel/orders"
                  className={cn(menuItemStyles, activeTab === MenuItems.orders && 'adminMenuActive')}>
                <svg width="22" height="29" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.625 7.51922H16.5V6.12307C16.5 4.64194 15.9205 3.22147 14.8891 2.17415C13.8576 1.12683 12.4587 0.538452 11 0.538452C9.54131 0.538452 8.14236 1.12683 7.11091 2.17415C6.07946 3.22147 5.5 4.64194 5.5 6.12307V7.51922H1.375C1.01033 7.51922 0.660591 7.66632 0.402728 7.92815C0.144866 8.18998 0 8.54509 0 8.91537V24.2731C0 25.3839 0.434597 26.4493 1.20818 27.2348C1.98177 28.0202 3.03098 28.4615 4.125 28.4615H17.875C18.969 28.4615 20.0182 28.0202 20.7918 27.2348C21.5654 26.4493 22 25.3839 22 24.2731V8.91537C22 8.54509 21.8551 8.18998 21.5973 7.92815C21.3394 7.66632 20.9897 7.51922 20.625 7.51922ZM8.25 6.12307C8.25 5.3825 8.53973 4.67227 9.05546 4.14861C9.57118 3.62495 10.2707 3.33076 11 3.33076C11.7293 3.33076 12.4288 3.62495 12.9445 4.14861C13.4603 4.67227 13.75 5.3825 13.75 6.12307V7.51922H8.25V6.12307ZM19.25 24.2731C19.25 24.6434 19.1051 24.9985 18.8473 25.2603C18.5894 25.5221 18.2397 25.6692 17.875 25.6692H4.125C3.76033 25.6692 3.41059 25.5221 3.15273 25.2603C2.89487 24.9985 2.75 24.6434 2.75 24.2731V10.3115H5.5V11.7077C5.5 12.078 5.64487 12.4331 5.90273 12.6949C6.16059 12.9567 6.51033 13.1038 6.875 13.1038C7.23967 13.1038 7.58941 12.9567 7.84727 12.6949C8.10513 12.4331 8.25 12.078 8.25 11.7077V10.3115H13.75V11.7077C13.75 12.078 13.8949 12.4331 14.1527 12.6949C14.4106 12.9567 14.7603 13.1038 15.125 13.1038C15.4897 13.1038 15.8394 12.9567 16.0973 12.6949C16.3551 12.4331 16.5 12.078 16.5 11.7077V10.3115H19.25V24.2731Z"
                        fill="#ACAAAA"/>
                </svg>
                <span className='font-semibold text-xl'>Замовлення</span>
            </Link>

            <Link href="/adminpanel/posts"
                  className={cn(menuItemStyles, activeTab === MenuItems.posts && 'adminMenuActive')}>
                <Icons.blog/>
                <span className='font-semibold text-xl'>Блог</span>
            </Link>
        </ul>

        <ul className='flex flex-col gap-y-[8px] select-none'>
            <Link href="/adminpanel/settings"
                  className={cn(menuItemStyles, activeTab === MenuItems.settings && 'adminMenuActive')}>
                <LuSettings className="text-2xl"/>
                <span className='font-semibold text-xl'>Налаштування</span>
            </Link>
            <li className={cn(menuItemStyles, 'hover:opacity-70 hover:bg-transparent')}
                onClick={() => signOut()}
            >
                <LuLogOut className="text-2xl"/>
                <span className=' font-semibold text-xl'>Вийти</span>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar