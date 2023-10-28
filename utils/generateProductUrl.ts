import { $Enums } from "@prisma/client"

export default function generateProductUrl (type: keyof typeof $Enums.ProductType, productId: string): string {
    switch(type) {
        case 'herb':
            return `/assortment/herbs/${productId}`
        case 'tea':
            return `/assortment/teas/${productId}`
        case 'sweet':
            return `/assortment/sweets/${productId}`
        // for spice, mixes, flavor, supps
        default:
            return `/assortment/spices/${productId}`
    }
}