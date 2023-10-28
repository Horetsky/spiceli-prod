"use client"

import { useState } from "react";
import { Swiper } from 'swiper/react';
import { SwiperProps } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import "./style.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./style.css"

import SliderPagination from "./SliderPagination";
import SliderControl from "./SliderControl";
import { Image } from "@prisma/client";

interface SliderProps extends SwiperProps {
  children: React.ReactNode;
  slidesPerView: number;
  spaceBetween: number;
  variant: "onePerView" | "somePerView";
  pagination?: boolean;
  controls?: "bottom" | "center" | "none";
  preview?: Image[] | null
}

export default function Slider ( { children, spaceBetween, slidesPerView, variant, pagination = false, preview = null, controls = "bottom" } : SliderProps ) {

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const [activeSlide, setActiveSlide] = useState<number>(0)

    const somePerViewBrakepoints = {
      150: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      428: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      600: {
        slidesPerView: slidesPerView - 1 ,
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: slidesPerView,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
    }
    const onePerViewBrakepoints = {
      150: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
      428: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
      600: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
      991: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: spaceBetween,
      },
    }

    return (
        <Swiper
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            modules={pagination ? [Navigation, Pagination, Scrollbar, A11y] : []}
            onSwiper={(e) => {
              setIsBeginning(e.isBeginning)
              setIsEnd(e.isEnd)
            }}
            onSlideChange={(e) => {
                setActiveSlide(e.activeIndex)
                setIsBeginning(e.isBeginning)
                setIsEnd(e.isEnd)
              }
            }
            pagination={{ clickable: true }}
            style={{ padding: variant === "somePerView" ? "12px" : "0", position: "relative"}}
            breakpoints={
              variant === "onePerView" ? onePerViewBrakepoints : somePerViewBrakepoints
            }

        >

        {
            children
        }

        {
          preview &&
            <SliderPagination pagination={preview} activeIndex={activeSlide} />
        }

        {
          controls === "bottom" ?
              <SliderControl
                isBeginning={isBeginning}
                isEnd={isEnd}
              /> : null
        }
      </Swiper>
    );
};

