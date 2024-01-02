"use client"

import { FC } from 'react'

import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/titles/SectionTitle';
import { FullProduct } from '@/types/types';
import AvailabilityTag from '@/components/ui/custom/AvailabilityTag';
import { Admin, Category } from '@prisma/client';
import ProductSlider from "@/app/(main)/assortment/(components)/ProductSlider";
import MakeOrder from "@/app/(main)/assortment/(components)/MakeOrder";

interface BuyProps {
  admin: Admin
  product: FullProduct;
  category: Category | null
}

const Buy: FC<BuyProps> = ({ product, category, admin }) => {
  return (
    <div className='container grid justify-items-stretch grid-cols-1 gap-4 md:grid-cols-[1fr_1.6fr]'>
        <div className='product-pagination relative h-[100vw] sm:h-[110vw] md:h-[550px] lg:h-[650px] sm:w-[100vw] md:w-[400px] lg:w-[500px] overflow-hidden'>
            <ProductSlider product={product} />
        </div>

        <div className='flex flex-col pt-4 md:pt-0 gap-y-4 md:gap-y-[20px] text-customPrimary'>
            <div className='flex flex-col gap-y-2'>
              <SectionTitle align="left" className='text-2xl md:text-4xl pb-0 md:pb-0'>
                {product?.name}
              </SectionTitle>
              <AvailabilityTag availability={product?.availability} />
              <p className='text-customSecondary max-w-[400px]'>
                {product?.description}
              </p>
            </div>

            <div>
              {
                product.discount &&
                  <div className='md:pb-0 pb-0 -mb-[8px] font-normal text-base md:text-lg line-through text-customSecondary opacity-80'>
                      {product.price} грн
                  </div>
              }
              <div className='relative w-fit'>
                <SectionTitle align="left" className='md:pb-0 pb-0 font-normal'>
                  {product?.discount ?? product?.price} грн
                </SectionTitle>
              </div>
            </div>

            <div>
            <h3 className="font-normal text-xl">Склад</h3>
              <p className='text-customSecondary max-w-[470px]'>
                {product?.features}
              </p>
            </div>

            <div className='flex flex-col justify-self-end text-left'>

                {/*<h3 className="font-semibold text-xl">Замовляй зараз</h3>*/}
                <MakeOrder product={product} />

            </div>
            
            {
              category &&
                <div>
                  <h3 className="font-medium text-xl pb-2">Обирай перець чорний</h3>
                  <div className='flex flex-wrap gap-3 pointer-events-none'>
                      <Button 
                            className='min-w-[170px] h-8 px-2 py-1 text-xs md:h-11 md:px-4 md:py-2'
                            variant="display"
                            size="sm"
                      >
                            {category.name}
                      </Button>
                  </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Buy