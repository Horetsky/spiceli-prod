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

const OrderForm = () => {

    const { orders, total, resetCart } = useCart();
    const router = useRouter();
    const {
        cities,
        loading,
        setSearchQuery
    } = useCitySearch()
    const {
        warehouses,
        loading: warehouseLoading,
        fetchWarehouses
    } = useWarehouseSearch()

    const form = useForm<OrderFormValues>({
        mode: "onBlur",
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            name: "",
            surname: "",
            phone: "",
            city: "",
            department: ""
        },
    })

    const cityRef = form.watch("city");
    useEffect(() => {
        fetchWarehouses(cityRef)
    }, [cityRef]);
    async function placeOrder(data: OrderFormValues) {
        const { city, department, customCity, customDepartment } = data;
        const dbCity = cities.find(item => item.value === city);
        const dbDepartment = warehouses.find(item => item.value === department);

        let deliveryCity: DBOrder["order"]["city"] = { label: "", value: "" };
        let deliveryDepartment: DBOrder["order"]["department"] = { label: "", value: "" };

        if(dbCity && dbDepartment) {
            deliveryCity = dbCity;
            deliveryDepartment = dbDepartment
        } else if (customCity && customDepartment) {
            deliveryCity = { label: customCity, value: "CUSTOM_CITY" };
            deliveryDepartment = { label: customDepartment, value: "CUSTOM_DEPARTMENT" }
        } else {
            return toast.error("Не вдалося зберегти дані про доставку. Спробуйте пізніше.")
        }

        const dbOrder: DBOrder = {
            cart: orders,
            order: {
                ...data,
                totalPrice: total,
                city: deliveryCity,
                department: deliveryDepartment
            }
        }

        await toast.promise(apiRequest({
            url: "/api/order",
            method: "POST",
            data: dbOrder
        }), {
            loading: "Оформлення замовлення...",
            success: () => {
                form.reset()
                router.replace("/");
                resetCart()
                return "Дякуємо за замовдення."
            },
            error: "Помилка. Спробуйте пізніше."
        })
    }

    return (
        <div className={"mt-[72px]"}>
            <h2 className={"font-sofia font-bold text-xl mb-9 flex gap-1"}>Деталі замовлення</h2>

            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(placeOrder)}>
                        <Accordion defaultValue={"item-1"} type={"single"} collapsible className="w-full">
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
                                        <FormAutocomplete
                                            name={"city"}
                                            control={form.control}
                                            selectValues={cities}
                                            searchFunc={setSearchQuery}
                                            placeholder={"Введіть своє місто"}
                                            loading={loading}
                                            label={"Місто"}
                                        />
                                        {
                                            warehouseLoading === "loading" ? <Spinner /> :
                                                <FormSelect
                                                    name={"department"}
                                                    control={form.control}
                                                    label={"Відділення"}
                                                    placeholder={"Виберіть відділення"}
                                                    options={warehouses}
                                                />
                                        }
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger className={"float-right mt-3 hover:underline text-xs font-montserrat font-normal text-right text-secondary-foreground"}>
                                            Не знайшли адресу для доставки?
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Не знайшли адресу для доставки?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Зазначте нижче власні дані і ми доставимо товар саме туди
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                                <div className={"flex flex-col gap-y-5"}>
                                                    <FormInput
                                                        name={"customCity"}
                                                        control={form.control}
                                                        label={"Місто"}
                                                    />
                                                    <FormInput
                                                        name={"customDepartment"}
                                                        control={form.control}
                                                        label={"Відділення"}
                                                    />
                                                </div>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Скасувати</AlertDialogCancel>
                                                <AlertDialogAction

                                                >
                                                    Зберегти
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className={"mt-11 py-5 flex flex-col gap-y-5"}>
                            <div className={"font-sofia text-2xl font-bold"}>
                                <div className={"flex items-center justify-between"}>
                                    До сплати:
                                    <div className={"text-right"}>
                                        { total.toLocaleString() } грн
                                    </div>
                                </div>
                                <div className={"text-xs font-montserrat font-light -mt-1 text-secondary-foreground"}>
                                    Оплата здійснюється при отриманні
                                </div>
                            </div>

                            <Button
                                type={"submit"}
                                size={"lg"}
                                disabled={orders.length === 0}
                                className={"w-full text-[1rem] h-14"}
                            >
                                Оформити замовлення
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default OrderForm;