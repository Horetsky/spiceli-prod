import { z } from "zod";

export const settingsSchema = z.object({
    userId: z.string().optional(),
    name: z.string().nonempty("Поле обов'язкове").min(3, 'Мінімальна кількість символів - 3'),
    surname: z.string().nonempty("Поле обов'язкове").min(3, 'Мінімальна кількість символів - 3'),
    phone: z.string().nonempty("Поле обов'язкове").regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
    password: z.string().nonempty("Поле обов'язкове").min(8, 'Мінімальна кількість символів - 8'),
})

export type ISettingsSchema = z.infer<typeof settingsSchema>