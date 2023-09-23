"use client"

import { FC, useEffect } from 'react'
import { useState } from 'react'

import { $Enums } from '@prisma/client'

interface AvailabilityTagProps {
    availability: keyof typeof $Enums.AvailablityStatus
}

const AvailabilityTag: FC<AvailabilityTagProps> = ({ availability }) => {
    const [tag, setTag] = useState<{
        status: string
        color: string,
    }>({
        status: "В наявності",
        color: "#A8DF8E"
    })

    useEffect(() => renderTag(), [availability])

    function renderTag () {
        switch (availability) {
            case "IN_STOCK":
                return setTag({ status: "В наявності", color: "#A8DF8E" });
            case "RUNS_OUT": 
                return setTag({ status: "Закінчується", color: "#F4D160" });
            case "OUT_OF_STOCK":
                return setTag({ status: "Закінчився", color: "#C70039" });
            default:
                return setTag({ status: "В наявності", color: "#A8DF8E" })
        }
    }

    return (
        <div className='flex gap-x-2 items-center'>
            <div className='w-2 h-2 rounded-full' style={{backgroundColor: tag.color}}></div>
            <div className='text-customSecondary'>{tag.status}</div>
        </div>
    )
}

export default AvailabilityTag