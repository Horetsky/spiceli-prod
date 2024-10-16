"use client"

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { useSwiper } from 'swiper/react';
import { cn } from "@/lib/utils";

type SliderControlProps = {
    isBeginning: boolean
    isEnd: boolean
    className?: string
}

const SliderControl = ( { isBeginning, isEnd, className = 'float-right' } : SliderControlProps ) => {
    const swiper = useSwiper();

    return (
        <div className={cn("h-11 py-1 pt-4 flex gap-5", className)}
            style={{visibility: isBeginning && isEnd ? "hidden" : "visible"}}
        >
            <button
                className="cardShadow w-9 h-9 bg-white rounded-full hover:border shadow-md cursor-pointer flex items-center justify-center"
                style={{opacity: isBeginning ? "0.5" : "1", cursor: isBeginning ? "default" : "pointer"}}
                onClick={() => swiper.slidePrev()}
            >
                <HiChevronLeft className="text-customSecondary" />
            </button>
            <button
                className="cardShadow w-9 h-9 bg-white rounded-full hover:border shadow-md cursor-pointer flex items-center justify-center"
                style={{opacity: isEnd ? "0.5" : "1", cursor: isEnd ? "default" : "pointer"}}
                onClick={() => swiper.slideNext()}
            >
                <HiChevronRight className="text-customSecondary" />
            </button>
        </div>
    );
};

export default SliderControl;