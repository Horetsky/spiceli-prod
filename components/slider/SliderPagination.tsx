"use client"

import { FC } from 'react'
import Image from 'next/image'
import { useSwiper } from 'swiper/react'
import SelectedDecor from '../ui/custom/SelectedDecor'
import { Image as ImageType } from '@prisma/client'
interface SliderPaginationProps {
  activeIndex: number;
  pagination: ImageType[]
}

const SliderPagination: FC<SliderPaginationProps> = ({ pagination, activeIndex }) => {
    const swiper = useSwiper()

    return (
      <div className="pagination select-none pt-2 md:pt-4 flex w-full gap-x-4">
            {
                pagination.slice(0, 4).map((item, i) => (
                  <div className='shrink-0 relative w-[60px] h-[60px] md:w-[90px] md:h-[90px] rounded-[4px] overflow-hidden hover:opacity-80 duration-300' 
                    onClick={() => swiper.slideTo(i)}
                    key={item?.id}
                  >
                      <Image 
                          src={item.url}
                          fill={true}
                          style={{objectFit: 'cover'}}
                          title={`${item.name}${i+1}`}
                          alt={`${item.name}${i+1}`}
                      />
                      {
                        activeIndex === i && 
                            <SelectedDecor 
                              type="default"
                            />
                      }
                  </div>
              ))
            }
          </div>
    )
}

export default SliderPagination