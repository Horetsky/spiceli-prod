import { Button } from "@/components/ui/button";
import { $Enums } from "@prisma/client";
import { FullProduct } from "@/types/types";
import { FC } from "react";

type Props = {
    product: FullProduct;
}
const MakeOrder: FC<Props> = ({ product }) => {
    const makeOrder = () => {};
    return (
        <div className={'flex flex-col gap-y-4'}>
            <Button
                variant="accent"
                className='mt-2 w-full h-12 max-w-[500px]'
                onClick={makeOrder}
                disabled={product?.availability === $Enums.AvailablityStatus.OUT_OF_STOCK}
            >Замовити</Button>
        </div>
    );
};

export default MakeOrder;