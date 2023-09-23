"use client"

import { FC } from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiRequest } from '@/hooks/apiRequest'
import { Admin } from '@prisma/client'

import { Icons } from '@/components/ui/icons'
import SearchPannel from '@/components/searchPannel/SearchPannel'
import SearchResult from './SearchResult'

import data from "../keywords.json"

interface HeaderProps {
  
}

type HeaderUser = {
  name: string;
  surname: string;
}
type searchRes = {
  product: boolean,
  blog: boolean,
  settings: boolean
}

const Header: FC<HeaderProps> = ({}) => {
  const [user, setUser] = useState<HeaderUser>()
  const defaultSeachRes = {
    product: false,
    blog: false,
    settings: false
  }
  const [searchRes, setSearchRes] = useState<searchRes>(defaultSeachRes)
  useEffect(() => {
      apiRequest({
        url: "/api/user",
        method: "GET"
      })
      .then((user: Admin) => setUser(user))
      .catch(() => setUser({
        name: "Поточний",
        surname: "адмін"
      }))
  }, [])

  function search (val: string) {
    if (val === "") return setSearchRes(defaultSeachRes)
    if (val.length < 2) return
    const isProduct = data.product.some(item => item.toLowerCase().includes(val.toLowerCase()))
    const isBlog = data.post.some(item => item.toLowerCase().includes(val.toLowerCase()))
    const isSettings = data.settings.some(item => item.toLowerCase().includes(val.toLowerCase()))
    setSearchRes({
      product: isProduct,
      blog: isBlog,
      settings: isSettings
    }) 
  }

  return (
    <div className='h-full items-center grid grid-cols-[1fr_2fr] px-6'>
      <SearchPannel 
        className='rounded-[4px]' 
        placeholder='Пошук...'
        searchFunc={(val) => search(val)}  
      >
        {
          searchRes?.product && 
          <>
            <SearchResult title="Товар" link="/adminpanel/products" descr='Перегляньте список товарів' onClick={() => setSearchRes(defaultSeachRes)}/>
            <SearchResult title="Товар" link="/adminpanel/products/create" descr='Сторіть новий товар' onClick={() => setSearchRes(defaultSeachRes)}/>
          </>
        }
        {
          searchRes?.blog && 
          <>
            <SearchResult title="Блог" link="/adminpanel/posts" descr='Перегляньте список постів' onClick={() => setSearchRes(defaultSeachRes)}/>
            <SearchResult title="Блог" link="/adminpanel/posts/create" descr='Сторіть новий пост' onClick={() => setSearchRes(defaultSeachRes)}/>
          </>
        }
        {
          searchRes?.settings &&
          <>
            <SearchResult title="Налаштування" link="/adminpanel/settings" descr='Налаштуйте свій профіль' onClick={() => setSearchRes(defaultSeachRes)}/>
          </>
        }
      </SearchPannel>
      {
        user &&
          <User 
            name={user?.name}
            surname={user?.surname}
          />
      }
    </div>
  )
}

const User = ( { name, surname } : HeaderUser ) => {
  return (
    <Link href="/adminpanel/settings" className='select-none justify-self-end'>  
      <div className='flex items-center gap-x-2'>
        <div className='rounded-[4px] flex items-center justify-center h-[40px] bg-secondaryLight overflow-hidden'>
          <Icons.profile className="w-[40px] hover:opacity-70 duration-300"/>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex items-center gap-x-1'>
            <h1 className='font-semibold'>{ name }</h1>
            <h1 className='font-semibold'>{ surname }</h1>
          </div>
          <h3 className='font-light mt-[-6px]'>Super Admin</h3>
        </div>
      </div>
    </Link>
  )
}

export default Header