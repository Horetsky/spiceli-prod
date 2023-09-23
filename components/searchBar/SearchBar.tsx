"use client"

import { ChangeEvent, FC } from 'react'
import { useState } from 'react';

import { LuSearch } from "react-icons/lu"
import { cn } from '@/lib/utils';
import Spinner from './spinner/Spinner';
import { Products } from '@prisma/client';
import SearchResults from './SearchResults';
import type { loadingStatus } from '@/hooks/useDebounceSearch';
interface SearchBarProps {
    loading: loadingStatus;
    searchFunc: (val: string) => void;
    placeholder?: string;
    className?: string;
    searchResults: Products[]
}

const SearchBar: FC<SearchBarProps> = ({ searchFunc, loading, searchResults, className, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        searchFunc(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm("")
        searchFunc("")
    }

    return (
        <div className={cn("relative select-none bg-customSecondary-foreground flex items-center justify-between gap-x-[0.5vw] h-10 w-full border border-input px-4 py-2", className)}>
            <LuSearch className="text-customSecondary text-lg" />
            <input className="font-sofia text-customSecondary bg-customSecondary-foreground w-full text-sm placeholder:customSecondary focus-visible:outline-none disabled:cursor-not-allowed"
                placeholder={placeholder}
                value={searchTerm}
                onChange={onChange}
            />
            <span className='font-sofia font-semibold text-customSecondary pr-2'>
                {
                    loading === "idle" ? <>Пошук</>  :
                    loading === "loading" ? <Spinner /> : null
                }
            </span>

            <div className='z-50 absolute w-full top-12 left-0'>
                    {
                        loading === "idle" ? null :
                        loading === "loading" ? null :
                        <div className="bg-customSecondary-foreground border border-input rounded-[8px] overflow-hidden">
                            <div className='w-full bg-customSecondary-foreground flex items-center justify-center text-center px-4 py-2 font-sofia text-customSecondary'>
                                { loading.message }
                            </div>
                        </div>
                    }
                
                    {
                        searchResults &&
                            searchResults.length > 0 &&
                            <div className="flex flex-col bg-customSecondary-foreground border border-input rounded-[8px] overflow-hidden">
                                {
                                    searchResults.map(item => (
                                        <SearchResults key={item.id} resultItem={item} onClick={clearSearch}/>
                                    ))
                                }
                            </div>
                    }
                
            </div>
    </div>
    )
}

export default SearchBar