import { Products, Image, Category } from "@prisma/client";
export interface FullProduct extends Products {
    images: Image[]
}

export interface FullCategory extends Category {
    products: FullProduct[]
}