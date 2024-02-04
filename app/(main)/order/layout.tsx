import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className={"container pt-[20px] pb-2 md:pb-6 md:pt-[40px] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0 lg:gap-24"}>
            { children }
        </div>
    )
}