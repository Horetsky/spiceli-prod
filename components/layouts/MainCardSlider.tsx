"use client"

import { FC } from 'react'
import Slider from '@/components/slider/Slider'
import { SwiperSlide } from 'swiper/react';

import ProductCard from '@/components/cards/ProductCard';
import { FullProduct } from '@/types/types';
import SliderControl from '../slider/SliderControl';

interface MainSliderProps {
  slides: FullProduct[]
}

const MainCardSlider: FC<MainSliderProps> = ({ slides }) => {
  return (
        <Slider
          spaceBetween={30}
          slidesPerView={4}
          variant="somePerView"
          controls="bottom"
        >
            {
              slides?.map(slide => (
                <SwiperSlide key={slide?.id}>
                  <ProductCard
                    product={slide}
                  />
                </SwiperSlide>
              ))
            }
        </Slider>
  )
}

export default MainCardSlider