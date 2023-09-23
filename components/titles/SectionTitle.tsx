import { FC } from 'react'
import { cn } from '@/lib/utils';

interface SectionTitleProps {
    align?: "left" | "center" | "right"
    className?: string;
    children: React.ReactNode
}

const SectionTitle: FC<SectionTitleProps> = ({ children, className, align = "center" }) => {
  return (
    <h2 className={cn("w-full font-sofia font-bold text-xl md:text-3xl text-customPrimary pb-4 md:pb-4", className)}
        style={{textAlign: align}}
    >
        { children }
    </h2>
  )
}

export default SectionTitle