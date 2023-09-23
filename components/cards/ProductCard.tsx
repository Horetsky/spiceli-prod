"use client"

import { FC } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import CustomButton from '../ui/custom/CustomButton';
import DetailsBubble from '../ui/custom/DetailsBubble';
import { Button } from '../ui/button';
import { FullProduct } from '@/types/types';

interface ProductCardProps {
    product: FullProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <Link href={`/assortment/${product?.type}s/${product?.id}`} className='max-w-[313.5px] min-w-[165.5px]'>
            <div className="productCard hover:scale select-none p-[12px] md:p-[20px] rounded-[8px] overflow-hidden bg-white w-full">
                <div className="relative min-h-[302px] md:min-h-[430px] grid grid-rows-[140px_1fr_0.7fr] md:grid-rows-[260px_1fr_0.5fr] content-between gap-y-1 md:gap-y-2 font-norms text-customPrimary">
                    {
                        product?.discount ?
                            <DetailsBubble variant="default">Знижка</DetailsBubble> :
                        product?.isNew ? 
                            <DetailsBubble variant="default">Новинка</DetailsBubble> :
                        product?.isBestseller ?
                            <DetailsBubble variant="default">Хіт</DetailsBubble> : null
                    }
                    <div className='relative rounded-[4px] overflow-hidden'>
                        <Image 
                            src={product?.images[0].url}
                            fill={true}
                            style={{objectFit: 'cover'}}
                            className='transition-transform duration-300'
                            title={product.name}
                            alt={product.name}
                        />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className="font-sofia font-medium text-mainDark text-lg md:text-xl max-h-[36px] text-hidden">{ product?.name }</h1>
                        <p className="text-customSecondary text-xs md:text-sm max-h-[56px] text-hidden leading-normal">{ product?.description }</p>
                    </div>

                    <div className="self-end flex flex-col gap-y-1 md:flex-row md:items-center md:justify-between">
                        <div className='flex items-center justify-between'>
                            <div className="font-sofia font-medium text-mainDark text-lg md:text-xl">{product?.discount ?? product?.price} грн</div>
                        </div>

                        <CustomButton 
                            variant="outline"
                            className='hidden md:inline-flex text-sm h-9'
                        >Детальніше</CustomButton>

                        <Button variant="outline"
                            className='inline-flex md:hidden text-xs h-9 font-sofia'
                        >
                            Детальніше
                        </Button>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default ProductCard