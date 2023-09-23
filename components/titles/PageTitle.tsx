import { FC } from 'react'

interface PageTitleProps {
  title: string;
  descr: string;
}

const PageTitle: FC<PageTitleProps> = ({ title, descr }) => {
  return (
    <div className='container pt-[20px] pb-2 md:pb-6 md:pt-[40px]'>
        <h1 className='font-sofia font-bold text-[30px] md:text-[40px] '>{ title }</h1>
        <p className='text-sm md:text-base max-w-[816px] text-customSecondary'>
            { descr }
        </p>
  </div>
  )
}

export default PageTitle