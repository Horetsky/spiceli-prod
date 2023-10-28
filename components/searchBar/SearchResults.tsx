import { FC } from 'react'

import Link from 'next/link'
import { Products } from '@prisma/client'
import { LuSearch, LuArrowUpLeft } from 'react-icons/lu'
import generateProductUrl from '@/utils/generateProductUrl';

interface SearchResultsProps {
    resultItem: Products;
    onClick: () => void
}

const SearchResults: FC<SearchResultsProps> = ({ resultItem, onClick }) => {
    const url = generateProductUrl(resultItem.type, resultItem.id)
    return (
        <Link href={url} className='w-full bg-customSecondary-foreground flex items-center justify-between hover:bg-[#E3E9EE] duration-300 px-4 py-2'
            onClick={() => onClick()}
        >
            <div className='flex items-center gap-x-4'>
                <LuSearch className="text-customSecondary text-lg" />
                <span className='font-sofia text-customSecondary '>
                    { resultItem?.name }
                </span>
            </div>
            <LuArrowUpLeft className="text-customSecondary text-xl" />
        </Link>
    )
}

export default SearchResults