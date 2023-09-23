import { FC, ReactNode } from 'react'

interface DetailsBubbleProps {
  float?: "left" | "right";
  variant?: "round" | "default"
  className?: string;
  children: ReactNode;
}

const DetailsBubble: FC<DetailsBubbleProps> = ( { children, className, float = "left", variant = "default" } ) => {
    return (
      <>
        {
            variant === "round" ? (
                <div className={`z-10 absolute -top-1 -right-6 flex items-center justify-center w-[18px] h-[18px] text-[11px] font-sofia font-bold leading-[1px] text-white bg-customAccent rounded-full ${className}`}
                  style={float === "right" ? {top: "-7px", right: "-10px"} : {top: "-7px", left: "-10px"}}
                >
                    {children}
                </div>
            ) : (
                <div className={`z-10 absolute -top-[7px] -right-[10px] flex items-center w-fit justify-center pb-[9px] md:pb-[10px] pt-[10px] md:pt-[11px] px-[8px] md:px-[11px] text-[11px] font-sofia font-bold leading-[1px] text-white bg-customAccent rounded-full ${className}`}
                  style={float === "right" ? {top: "-7px", right: "-10px"} : {top: "-7px", left: "-10px"}}
                >
                    {children}
                </div>
            )

        }
    </>
    )
}

export default DetailsBubble