import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className={"container pt-[20px] pb-2 md:pb-6 md:pt-[40px] grid grid-cols-1 gap-0"}>
            {children}
        </div>
    )
}