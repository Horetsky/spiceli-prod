import { FC } from 'react'
import SettingsForm from './SettingsForm'
import prisma from '@/prisma/client'
interface pageProps {
    
}

const page: FC<pageProps> = async ({}) => {
    const admin = await prisma.admin.findMany({})
    return <SettingsForm user={admin[0]}/>
}

export default page