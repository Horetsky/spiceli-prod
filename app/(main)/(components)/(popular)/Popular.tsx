import { FC } from 'react'
import SectionTitle from '@/components/titles/SectionTitle';
import MainCardSlider from '@/components/layouts/MainCardSlider';
import prisma from '@/prisma/client';
import { FullProduct } from '@/types/types';
import EmptyList from '@/components/ui/custom/EmptyList';

interface pageProps {

}

const Popular: FC<pageProps> = async () => {
  const bestsellers = await prisma.products.findMany({
    where: {
      isBestseller: true
    },
    include: {
      images: true
    }
  }) as unknown as FullProduct[]
  return (
    <div className='md:container'>
        <SectionTitle className='container pb-0'>Найпопулярніше</SectionTitle>
        {
          bestsellers.length > 0 ?
            <MainCardSlider 
              slides={bestsellers}
            /> : <EmptyList message='Тут поки що порожньо' />
        }

    </div>
  )
}

export default Popular