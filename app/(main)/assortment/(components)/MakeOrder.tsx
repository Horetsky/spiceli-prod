import { Button } from "@/components/ui/button";
import { $Enums } from "@prisma/client";
import { FullProduct } from "@/types/types";
import { FC } from "react";
import { useCart } from "@/providers/cart-provider";
import { useRouter } from "next/navigation";

type Props = {
    product: FullProduct;
}

const MakeOrder: FC<Props> = ({ product }) => {
    const { orders, saveOrder } = useCart();
    const router = useRouter();

    const isAvailable = product?.availability === $Enums.AvailablityStatus.OUT_OF_STOCK;
    const isInCart = !!orders.find(item => item.id === product.id);

    const handleAddToCart = () => {
        if(isInCart) return
        saveOrder(product)
    }

    const makeOrder = () => {
        handleAddToCart()
        router.push("/order")
    };

    return (
        <div className={'flex flex-col gap-y-3'}>
            <Button
                variant="outline"
                className='mt-2 w-full h-12 max-w-[500px]'
                onClick={handleAddToCart}
                disabled={isAvailable || isInCart}
            >
                Додати в кошик
            </Button>
            <Button
                variant="accent"
                className='mt-2 w-full h-12 max-w-[500px]'
                onClick={makeOrder}
                disabled={isAvailable}
            >
                Замовити
            </Button>
        </div>
    );
};

export default MakeOrder;