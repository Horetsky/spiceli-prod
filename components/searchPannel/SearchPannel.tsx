"use client"

import { FC } from 'react'
import { useState, useEffect } from 'react';
import { LuSearch } from "react-icons/lu"
interface SearchPannelProps {
  searchFunc: (val: string) => void;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

const SearchPannel: FC<SearchPannelProps> = ({ searchFunc, className, placeholder, children }) => {
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    searchFunc(inputValue)
}, [inputValue])

  return (
    <div className={`${ className } relative select-none bg-customSecondary-foreground flex items-center justify-between gap-x-[0.5vw] h-10 w-full border border-input px-4 py-2`}>
        <LuSearch className="text-customSecondary text-lg" />
        <input className="font-sofia text-customSecondary bg-customSecondary-foreground w-full text-sm placeholder:customSecondary focus-visible:outline-none disabled:cursor-not-allowed"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        <span className='font-sofia font-semibold text-customSecondary pr-2'>Пошук</span>

        <div className='z-50 absolute w-full top-12 left-0 flex flex-col gap-y-2'>
            {
              children
            }
        </div>
    </div>
);
}

export default SearchPannel