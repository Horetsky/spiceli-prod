import { FC, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Controller, Thumbs } from 'swiper/modules';
import { SwiperClass } from 'swiper/react';
import "./style.css";

import Image from "next/image";
import SliderControlCenter from "@/components/slider/SliderControlCenter";
import { FullProduct } from "@/types/types";
import SelectedDecor from "@/components/ui/custom/SelectedDecor";
import { ImageInput } from "@/app/(admin)/adminpanel/products/formSchema";

const onePerViewBreakpoints = {
    150: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    428: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    600: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
    991: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 50,
    },
}

type Props = {
    product: FullProduct
}

const ProductSlider: FC<Props> = ({ product }) => {
    const images = product.images
    // Swiper thumbsinstance
    const [swiperThumbs, updateSwiperThumbs] = useState<SwiperClass>();

    const [isBeginning, setIsBeginning] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const [activeSlide, setActiveSlide] = useState<number>(0)

    return (
        <>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Controller, Pagination, Navigation, Thumbs]}
                    thumbs={{ swiper: swiperThumbs}}
                    onSlideChange={(e) => {
                        setActiveSlide(e.activeIndex)
                        setIsBeginning(e.isBeginning)
                        setIsEnd(e.isEnd)
                    }
                    }
                    pagination={{ clickable: true }}
                    style={{ position: "relative" }}
                    breakpoints={onePerViewBreakpoints}
                >
                    {
                        images.length === 0 ?
                            <div className='absolute top-1/3 left-1/2 -translate-y-1/2'>фото товару відсутні</div> :
                            images.map(slide => (
                                <SwiperSlide key={slide.id} className='aspect-square relative w-full md:h-[400px] lg:h-[500px] rounded-[10px] overflow-hidden'>
                                    <Image
                                        src={slide.url}
                                        title={slide.name!}
                                        fill={true}
                                        style={{objectFit: 'cover'}}
                                        alt={slide.name!}
                                        className='aspect-square'
                                    />
                                </SwiperSlide>
                            ))
                    }
                    <SliderControlCenter
                        isBeginning={isBeginning}
                        isEnd={isEnd}
                        className="text-white"
                    />
                </Swiper>
                <div className='pt-2 md:pt-4 hidden md:block'>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={5}
                        modules={[Controller, Thumbs]}
                        breakpoints={
                            {
                                150: {
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                                428: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                                600: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                                991: {
                                    slidesPerView: 5,
                                    slidesPerGroup: 1,
                                    spaceBetween: 10,
                                },
                            }
                        }
                        slideToClickedSlide={true}
                        onSwiper={updateSwiperThumbs}
                        watchSlidesProgress
                        style={{ position: "relative" }}
                    >
                        {
                            images.map((slide, i) => (
                                <SwiperSlide key={slide.id}>
                                    <div
                                        className='shrink-0 relative md:w-[65px] md:h-[65px] lg:w-[90px] lg:h-[90px] rounded-[4px] overflow-hidden cursor-pointer'>
                                        <Image
                                            src={slide.url}
                                            title={slide.name!}
                                            fill={true}
                                            style={{objectFit: 'cover'}}
                                            alt={slide.name!}
                                            className='aspect-square'
                                        />
                                        {
                                            activeSlide === i &&
											<SelectedDecor
												type="default"
											/>
                                        }
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
        </>
    );
};

export default ProductSlider;