import CustomButton from '@/components/ui/custom/CustomButton'
import { routes } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface NatureProps {
  
}

const Nature: FC<NatureProps> = ({}) => {
  return (
    <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
          <div className='flex flex-col gap-y-3 md:gap-y-4'>
              <h1 className='font-sofia font-bold text-[25px] md:text-[35px] lg:text-[40px] xl:text-[50px]'>Природні скарби <br /> для вашого здоров’я</h1>
              <p className='font-light text-customSecondary text-sm md:text-lg'>Пропонуємо широкий асортимент високоякісних трав, зібраних з любов'ю, які сприяють підтриманню вашого фізичного та емоційного благополуччя.</p>
              <Link href={routes.herbs}>
                <CustomButton variant="custom" size="lg" className='btnHover text-sm px-3 md:px-4 mt-[20px] md:mt-[30px]'>До асортименту</CustomButton>
              </Link>
          </div>
          <div className='w-full h-[460px] hidden md:block relative rounded-[8px] overflow-hidden'>
            <Image
              src="/images/image_sectionNature.jpg"
              fill={true}
              objectFit='cover'
              alt='image'
            />
          </div>
        </div>
    </div>
  )
}

export default Nature