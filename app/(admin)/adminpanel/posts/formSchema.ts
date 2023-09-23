import { z } from "zod"
import { $Enums } from "@prisma/client"

export const postSchema = z.object({
    type: z.union([
        z.literal($Enums.PostType.video),
        z.literal($Enums.PostType.article)
    ]),
    postId: z.string().optional(),
    title: z.string().nonempty("Поле обовʼязкове").min(3, 'Мінімальна кількість символів - 3'),
    description: z.string().nonempty("Поле обовʼязкове").min(10, 'Мінімальна кількість символів - 10'),
    link: z.string().nonempty("Поле обовʼязкове")
})

export type IPostSchema = z.infer<typeof postSchema>