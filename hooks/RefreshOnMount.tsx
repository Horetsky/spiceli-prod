'use client'
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const RefreshOnMount = ({ children }:{children: React.ReactNode}) => {
    const router= useRouter()

    useEffect(() => {
        router.refresh()
    }, []);

    return children
};

export default RefreshOnMount;