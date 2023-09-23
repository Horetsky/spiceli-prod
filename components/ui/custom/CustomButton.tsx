import React from 'react'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../button'
import { ButtonProps } from '../button'

import { SlArrowRight } from "react-icons/sl"

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  iconProp?: string
}

const CustomButton: FC<CustomButtonProps> = ( { variant, children, iconProp, ...props } ) => {
  const buttonStyles = "select-none inline-flex items-center font-sofia justify-center w-fit border-[1.5px] border-customSecondary gap-x-[8px] rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  return (
        <Button variant={variant} size={props.size} className={cn(buttonStyles, props.className)}>
            { children }
            <SlArrowRight className={iconProp} />
        </Button>
  )
}

export default CustomButton;