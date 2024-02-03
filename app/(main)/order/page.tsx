import OrderForm from "@/app/(main)/order/_components/orderForm";
import OrderedProducts from "@/app/(main)/order/_components/orderedProducts";

const Page = () => {
    return (
        <>
            <OrderedProducts />
            <OrderForm />
        </>
    )
}

export default Page;