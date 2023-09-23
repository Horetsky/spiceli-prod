"use client"

import { FC } from 'react'
import Link from 'next/link';
import { IoMdShareAlt } from "react-icons/io";

interface SearchResultProps {
    title: string;
    descr: string;
    link: string;
    onClick?: () => void
}

const SearchResult: FC<SearchResultProps> = ({ title, descr, link, onClick }) => {
    return (
        <Link href={link}
            onClick={onClick}
        >
            <div className='flex items-center gap-x-4 bg-white productCard rounded-[4px] py-2 px-4 opacity-90 hover:opacity-100 duration-300'>
                <div className='w-9 h-9 flex items-center justify-center rounded-full bg-customSecondary-foreground'>
                    <IoMdShareAlt className="text-xl text-customSecondary"/>
                </div>
                <div className='flex flex-col'>
                    <span className='font-semibold'>{ title }</span>
                    <span className='text-customSecondary font-light -mt-[6px]'>{ descr }</span>
                </div>
            </div>
        </Link>
    )
}

export default SearchResult