import { FC } from 'react'
import { cn } from '@/lib/utils';

interface SectionTitleProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title, children, className }) => {
  return (
    <div className={cn('flex w-full items-center justify-between border-b-[1px] pb-3', className)}>
        <h1 className='text-primary font-bold text-3xl'>{ title }</h1>
        <div className='flex items-center gap-x-2'>
            { children }
        </div>
    </div>
  )
}

export default SectionTitle