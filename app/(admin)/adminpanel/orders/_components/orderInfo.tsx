"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { DBOrder, orderFormSchema, OrderFormValues } from "@/app/(main)/order/_components/orderForm/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/form/FormInput";
import { useCitySearch } from "@/app/(main)/order/_components/orderForm/useCitySearch";
import FormAutocomplete from "@/components/ui/form/FormAutocomplete";
import FormSelect from "@/components/ui/form/FormSelect";
import { useWarehouseSearch } from "@/app/(main)/order/_components/orderForm/useWarehouseSearch";
import { useEffect } from "react";
import Spinner from "@/components/searchBar/spinner/Spinner";
import { useCart } from "@/providers/cart-provider";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/hooks/apiRequest";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { AdminOrder } from "@/app/(admin)/adminpanel/orders/page";
import { OrderStatus } from "@prisma/client";

const OrderInfo = ({id, order, status }: AdminOrder) => {
    const router = useRouter();

    const isNew = status === 'IN_PROCESS';

    const form = useForm<OrderFormValues>({
        mode: "onBlur",
        defaultValues: {
            name: order.name,
            surname: order.surname,
            phone: order.phone,
            city: order.city.label,
            department: order.department.label
        },
    })

    async function placeOrder() {
        const newStatus: OrderStatus = "DONE";
        const method = isNew ? "PUT" : 'DELETE';
        const success = isNew ? "Статус успішно змінено." : "Замовлення видалено."

        await toast.promise(apiRequest({
            url: `/api/order?status=${newStatus}`,
            data: { id },
            method
        }), {
            loading: "Оновлення даних...",
            success: () => {
                router.replace("/adminpanel/orders");
                return success
            },
            error: "Помилка"
        })
    }

    return (
        <div className={"mt-[72px]"}>
            <h2 className={"font-sofia font-bold text-xl mb-9 flex gap-1"}>Деталі замовлення</h2>

            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(placeOrder)}>
                        <Accordion defaultValue={["item-1", "item-2"]} type={"multiple"} className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={"py-5 text-lg"}>
                                    Персональні дані
                                </AccordionTrigger>
                                <AccordionContent className={"px-1 pb-5"}>
                                    <div className={"flex flex-col gap-y-5"}>
                                        <FormInput
                                            name={"name"}
                                            control={form.control}
                                            label={"Ім'я"}
                                        />
                                        <FormInput
                                            name={"surname"}
                                            control={form.control}
                                            label={"Прізвище"}
                                        />
                                        <FormInput
                                            name={"phone"}
                                            control={form.control}
                                            mask={'+380 (99) 999-99-99'}
                                            maskChar={''}
                                            description={""}
                                            label={"Номер телефону"}
                                        />

                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className={"py-5 text-lg"}>
                                    Доставка
                                </AccordionTrigger>
                                <AccordionContent className={"px-1 pb-5"}>
                                    <div className={"flex flex-col gap-y-5"}>
                                        <FormInput
                                            name={"city"}
                                            control={form.control}
                                            label={"Місто"}
                                        />
                                        <FormInput
                                            name={"department"}
                                            control={form.control}
                                            label={"Відділення"}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className={"mt-11 py-5 flex flex-col gap-y-5"}>
                            <div className={"font-sofia text-2xl font-bold"}>
                                <div className={"flex items-center justify-between"}>
                                    До сплати:
                                    <div className={"text-right"}>
                                        { order.totalPrice.toLocaleString() } грн
                                    </div>
                                </div>
                                <div className={"text-xs font-montserrat font-light -mt-1 text-secondary-foreground"}>
                                    Оплата здійснюється при отриманні
                                </div>
                            </div>

                            <Button
                                type={"submit"}
                                size={"lg"}
                                variant={isNew ? "default" : "destructive"}
                                className={"w-full text-[1rem] h-14"}
                            >
                                {
                                    isNew ? "Позначити як виконане" : "Видалити"
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default OrderInfo;