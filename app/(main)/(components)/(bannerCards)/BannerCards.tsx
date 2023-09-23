import { FC } from 'react'
import Image from 'next/image'
import CustomButton from '@/components/ui/custom/CustomButton'
import { routes } from '@/lib/routes'
import "./style.css"
import Link from 'next/link'

interface BannerCardsProps {
    // TODO
}

const BannerCards: FC<BannerCardsProps> = ({}) => {
  return (
    <div className='container'>
        <div className='cardsGridWrapper'>
            <div className='bannerCard card1 p-[15px] md:p-[47px] select-none hover:scale'
                style={{gridArea: "left"}}
            >
                <div className='w-full p-0 absolute z-10 top-1/2 -translate-y-1/2'>
                    <div className='flex flex-col'>
                        <h1 className="font-sofia font-bold text-[35px] md:text-[50px] lg:text-[60px] xl:text-[75px] text-customAccent">Смакуй життя</h1>
                        <h3 className="mt-[-10px] md:mt-[-20px] font-sofia font-light text-[18px] md:text-[25px] lg:text-[30px] xl:text-[35px] text-mainDark">разом з нашими приправами!</h3>
                        <Link href={routes.spices} className='w-fit'>
                            <CustomButton variant="custom" size="lg" className='btnHover text-sm px-3 md:px-4 h-9 md:h-11 md:py-2 mt-[10px] md:mt-[20px] xl:mt-[30px]'>До асортименту</CustomButton>
                        </Link>
                    </div>
                </div>
                <Image 
                    src='/images/image_cardBanner-1.png' 
                    fill={true}
                    style={{objectFit: 'cover'}}
                    className='transition-transform duration-500'
                    alt='banner'
                />
            </div>

            <Link href="/blog">        
                <div className='bannerCard card2 select-none hover:scale'
                    style={{gridArea: "top"}}
                >
                    <Image 
                        src='/images/image_cardBanner-2.jpg' 
                        width={480}
                        height={224}
                        className='transition-transform duration-300'
                        alt='banner'
                    />

                    <div className='w-full p-[15px] md:p-[30px] absolute z-10 top-1/2 -translate-y-1/2'>
                        <div className='float-right flex flex-col justify-end text-right text-white'>
                            <h1 className="font-grechen text-[55px] md:text-[60px] xl:text-[75px]">Spiceli</h1>
                            <h3 className="mt-[-25px] md:mt-[-30px] font-sofia font-light text-[30px] md:text-[40px]">рецепти</h3>
                        </div>
                    </div>
                    
                </div>
            </Link>

            <Link href="/discounts">
                <div className='bannerCard card3 select-none hover:scale'
                    style={{gridArea: "bottom"}}
                >
                    <Image 
                        src='/images/image_cardBanner-3.jpg' 
                        width={480}
                        height={224}
                        className='transition-transform duration-300'
                        alt='banner'
                    />

                    <div className='w-full p-[15px] md:p-[30px] absolute z-10 top-1/2 -translate-y-1/2'>
                        <div className='flex flex-col gap-y-2 justify-end text-white'>
                            <h1 className="font-sofia font-bold text-[35px] md:text-[25px] lg:text-[40px] xl:text-[50px]">Знижки -25%</h1>
                            <h3 className="mt-[-20px] font-sofia text-[25px]">на більш ніж</h3>
                            <h3 className="mt-[-15px] font-sofia font-light text-[28px] md:text-[35px]">50 товарів</h3>
                        </div>
                    </div>
                </div>    
            </Link>
        </div>
    </div>
  )
}

export default BannerCards