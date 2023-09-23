"use client"

import { FC } from 'react'

import Slider from '@/components/slider/Slider'
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/titles/SectionTitle';
import { LuPhone } from "react-icons/lu"
import { FullProduct } from '@/types/types';
import AvailabilityTag from '@/components/ui/custom/AvailabilityTag';
import { Admin, Category } from '@prisma/client';
import Link from 'next/link';

interface BuyProps {
  admin: Admin
  product: FullProduct;
  category: Category | null
}

const Buy: FC<BuyProps> = ({ product, category, admin }) => {
  return (
    <div className='container grid justify-items-stretch grid-cols-1 md:grid-cols-[1fr_1fr] min-[1200px]:grid-cols-[1fr_1.4fr_0.3fr] gap-x-9'>
        <div className='max-w-full md:max-w-[450px] overflow-hidden'>
            <Slider
                slidesPerView={1}
                variant="onePerView"
                spaceBetween={50}
                preview={product?.images}
                controls={product?.images.length > 1 ? "center" : "none"}
            >
              {
                product?.images?.map((item, i) => (
                  <SwiperSlide key={item.id} >
                      <div className='relative w-full h-[70vw] md:h-[450px] rounded-[10px] overflow-hidden'>
                          <Image 
                              src={item.url}
                              fill={true}
                              style={{objectFit: 'cover'}}
                              title={`${item.name}${i+1}`}
                              alt={`${item.name}${i+1}`}
                          />
                      </div>
                  </SwiperSlide>
                ))
              }
            </Slider>
        </div>
          
        <div className='flex flex-col pt-4 md:pt-0 gap-y-4 md:gap-y-[20px] font-norms text-customPrimary'>
            <div className='flex flex-col gap-y-2'>
              <SectionTitle align="left" className='text-2xl md:text-3xl pb-0 md:pb-0'>
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

            <div className='flex min-[1200px]:hidden flex-col justify-self-end text-left'>

              <h3 className="font-semibold text-xl">Замовляй зараз</h3>
              <div className="flex flex-col">
                  <Link href={`tel:${admin?.phone}`} className="font-semibold text-base">
                    {admin?.phone}
                  </Link>
                  <span className="-mt-2 font-light text-sm text-customSecondary">
                    {admin?.name}
                  </span>
              </div>
              <Link href={`tel:${admin?.phone}`} className='w-full'>
                <Button variant="accent" className='mt-2 w-full'>
                  <div className='flex items-center gap-x-2'>
                    <LuPhone className="font-bold text-base" />
                    <span className='font-sofia'>Зателефонувати</span>
                  </div>
                </Button>
              </Link>
            </div>

            <div>
            <h3 className="font-normal text-xl">Склад</h3>
              <p className='text-customSecondary max-w-[470px]'>
                {product?.features}
              </p>
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

        <div className='hidden min-[1200px]:flex flex-col justify-self-end text-right'>

              <h3 className="font-semibold text-xl mb-[4px]">Замовляй зараз</h3>
              <div className="flex flex-col">
                  <Link href={`tel:${admin?.phone}`} className="font-semibold text-base">
                    {admin?.phone}
                  </Link>
                  <span className="-mt-[8px] font-light text-sm text-customSecondary mb-[4px]">
                    {admin?.name}
                  </span>
              </div>
              <Link href={`tel:${admin?.phone}`} className='w-full'>
                <Button variant="accent" className='w-full'>
                  <div className='flex items-center gap-x-2'>
                    <LuPhone className="font-bold text-base" />
                    <span className='font-sofia'>Зателефонувати</span>
                  </div>
                </Button>
              </Link>
        </div>
      
    </div>
  )
}

export default Buy