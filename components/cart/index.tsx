"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/cartItem";
import { LuX } from "react-icons/lu";
import { useState } from "react";
import { Icons } from "@/components/ui/icons";


const Cart = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='relative'>
            <div className='w-fit relative' onClick={() => setOpen(state => !state)}>
                <Icons.cart className="w-[40px] hover:opacity-70 duration-300 cursor-pointer" />
            </div>
            <div className='scrollbar-hidden bg-white rounded-md border bg-popover p-1 text-popover-foreground shadow-m w-[80vw] md:min-w-[295px] md:max-w-[330px] overflow-hidden flex flex-col py-4 gap-y-2 px-2 absolute z-50 -right-9 md:right-0 top-14'
                 style={{ display: open ? "block" : "none"}}
            >
                <div className='w-full flex items-center justify-between'>
                    <h1 className="font-sofia font-semibold text-base md:text-xl text-customPrimary">Корзина</h1>
                    <div className='cursor-pointer' onClick={() => setOpen(false)}>
                        <LuX />
                    </div>
                </div>
                <div className='flex flex-col py-4 gap-y-2 max-h-[450px] overflow-y-scroll hideScrollBar'>
                    <div className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
                        <CartItem />
                    </div>
                </div>
                <Button
                    variant={"accent"}
                    className='h-8 min-h-[32px] w-full'
                >Замовити</Button>
            </div>
        </div>
    );
};

export default Cart;