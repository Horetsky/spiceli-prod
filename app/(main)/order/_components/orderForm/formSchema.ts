import { z } from "zod";
import { FullProduct } from "@/types/types";

const phoneRegex = /^\+\d{1,3}\s\(\d{2,3}\)\s\d{3}-\d{2}-\d{2}$/
export const orderFormSchema = z.object({
    name: z.string().min(1, "Поле обов'язкове"),
    surname: z.string().min(1, "Поле обов'язкове"),
    phone: z.string().min(1, "Поле обов'язкове").regex(phoneRegex, 'Введіть коректний номер'),
    city: z.string(),
    department: z.string(),

    customCity: z.string().optional(),
    customDepartment: z.string().optional()
})
.refine(data => {
    const { city, customCity} = data
    return city.length > 0 || customCity
}, { message: "Поле обов'язкове", path: ["city"] })
.refine(data => {
    const { department, customDepartment} = data
    return department.length > 0 || customDepartment
}, { message: "Поле обов'язкове", path: ["department"] })

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export type DBOrder = {
    cart: Array<FullProduct & {
        quantity: number
    }>,
    order: {
        name: string;
        surname: string;
        phone: string;
        totalPrice: number;
        city: { label: string, value: string };
        department: { label: string, value: string };
    }
}