'use client'
import {SessionProvider} from "next-auth/react";
import React from "react";
import {Session} from "next-auth"

interface IProvidersProps {
    children: React.ReactNode,
    session: Session | null
}
const Providers = ({ children, session }: IProvidersProps) => {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default Providers;