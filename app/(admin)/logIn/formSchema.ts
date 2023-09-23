import { z } from "zod";

export const loginSchema = z.object({
    password: z.string().nonempty('Поле обовʼязкове').min(8, 'Мінімальна кількість символів - 8'),
})

export type ILoginSchema = z.infer<typeof loginSchema>