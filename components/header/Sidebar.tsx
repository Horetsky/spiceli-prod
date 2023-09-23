import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icons } from '../ui/icons'

import { routes } from '@/lib/routes'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import "./style.css"

interface SidebarProps {
  admin: {
    name: string,
    phone: string
  } | null;
  onClick: () => void;
  isOpen: boolean
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClick, admin }) => {
  return (
    <div className={`container pb-[120px] font-light text-lg sidebar  ${isOpen && 'sidebar--open'}`}>
      <div className='grid grid-cols-[1fr_1fr] items-center'>
        <Link href={routes.home} className="justify-self-start"
          onClick={onClick}
        >
            <Image 
                src="/icon/logo.svg"
                width={235}
                height={100}
                title="spiceli"
                className="min-w-[130px]"
                alt="logo"
            />
          </Link>
          <div className='justify-self-end' onClick={onClick}> 
            <Icons.close />
          </div>
      </div>
        <div className='flex flex-col gap-y-2 mt-[10px] border-y-[1px] py-[16px]'>
          <h1 className="font-sofia font-semibold text-2xl">Меню</h1>
          <ul className='flex flex-col gap-y-4 '>

            <Link href={routes.home} onClick={onClick}>
              <li className='flex gap-x-3'>
                <Icons.papper />
                <span>Головна</span>
              </li>          
            </Link>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger
                    className="w-full select-none flex items-center gap-[20px] py-0 px-0"
                  >
                    <div
                      className="font-light w-full flex items-center gap-3 p-0"
                    >
                      <Icons.papper />
                      <span>Асортимент</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col text-lg py-[10px] mt-[12px] mx-[10px] gap-y-[10px] border-t border-b">
                      <Link href={routes.spices} onClick={onClick}>
                        <li>Спеції</li>
                      </Link>
                      <Link href={routes.herbs} onClick={onClick}>
                        <li>Трави</li>
                      </Link>
                      <Link href={routes.teas} onClick={onClick}>
                        <li>Чаї</li>
                      </Link>

                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            <Link href={routes.new} onClick={onClick}>
              <li className='flex gap-x-3'>
                <Icons.papper />
                <span>Новинки</span>
              </li>
            </Link>

            <Link href={routes.blog} onClick={onClick}>
              <li className='flex gap-x-3'>
                <Icons.papper />
                <span>Блог</span>
              </li>
            </Link>

            {/* <Link href="#" onClick={() => {
              onClick();
              notAvatibleAllert()
            }}>
              <li className='flex gap-x-3'>
                <Icons.papper />
                <span>Корзина</span>
              </li>
            </Link> */}

            {/* <Link href="#" onClick={() => {
              onClick();
              notAvatibleAllert()
            }}>
              <li className='flex gap-x-3'>
                <Icons.papper />
                <span>Профіль</span>
              </li>
            </Link> */}

          </ul>
        </div>
        {
          admin &&
            <div className="flex flex-col gap-y-1 pt-4">
                <h1 className="font-sofia font-semibold text-2xl">Контакти</h1>
                <div className="flex flex-col justify-self-end">
                  <Link href={`tel:${admin?.phone}`} className="text-base">
                    {admin?.phone}
                  </Link>
                  <span className="font-light text-sm text-customSecondary">5 днів на тиждень з 7:00</span>
                </div>
            </div>
        }
        
        <div className='self-end w-full flex justify-center'>
          <div className="flex gap-x-4">
              <Link href={routes.social.youtube} onClick={onClick}><Icons.youtube className="hover:opacity-70 duration-300"/></Link>
              <Link href={routes.social.facebook} onClick={onClick}><Icons.facefook className="hover:opacity-70 duration-300"/></Link>
              <Link href={routes.social.tiktok} onClick={onClick}><Icons.tiktok className="hover:opacity-70 duration-300"/></Link>
          </div>
        </div>
      </div>
  )
}

export default Sidebar