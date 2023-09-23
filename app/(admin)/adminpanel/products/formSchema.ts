import { z } from "zod";
import { $Enums } from "@prisma/client";

export const imageInput = z.object({
    id: z.string().optional(),
    url: z.string().min(1, 'Фото обовʼязкове'),
    name: z.string().optional(),
})

const noCommaRegex = /^[^,]+$/;

export const ProductSchema = z.object({
    type: z.union([
        z.literal($Enums.ProductType.spice),
        z.literal($Enums.ProductType.herb),
        z.literal($Enums.ProductType.tea)
    ]),
    productId: z.string().optional(),
    isNew: z.boolean().optional(),
    isBestseller: z.boolean().optional(),
    availability: z.union([
        z.literal($Enums.AvailablityStatus.IN_STOCK),
        z.literal($Enums.AvailablityStatus.RUNS_OUT),
        z.literal($Enums.AvailablityStatus.OUT_OF_STOCK),
    ]),
    name: z.string().nonempty("Поле обовʼязкове").min(3, 'Мінімальна кількість символів - 3'),
    description: z.string().nonempty("Поле обовʼязкове").min(10, 'Мінімальна кількість символів - 10'),
    features: z.string().nonempty("Поле обовʼязкове"),
    price: 
        z.string()
        .nonempty("Поле обовʼязкове")
        .refine((value) => noCommaRegex.test(value), {
            message: "Рядок не повинен містити символи коми. Використайте крапку.",
        })
        .refine(price => !isNaN(parseFloat(price)), {
            message: "Ціна може бути лише числом"
        })
        .transform(price => Number(price)).or(z.number()),
    discount:
        z.string()
        .optional()
        .refine((value) => {
            if (value) return noCommaRegex.test(value)
        }, {
            message: "Рядок не повинен містити символи коми. Використайте крапку.",
        })
        .refine(discount => {
            if (!discount || discount === "") return true
            return !isNaN(parseFloat(discount))
        }, {
            message: "Знижка може бути лише числом"
        })
        .transform(discount => {
            if (Number(discount) === 0) return undefined
            return Number(discount)
        }).or(z.number()),
    category: 
        z.string()
        .optional()
        .transform(category => {
            if (category === "") return null
            return category
        }).or(z.null()),
    images: z.array(imageInput)
})

export type IProductSchema = z.infer<typeof ProductSchema>
export type ImageInput = z.infer<typeof imageInput>