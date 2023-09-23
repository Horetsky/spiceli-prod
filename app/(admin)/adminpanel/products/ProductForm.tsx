"use client"

import { FC } from 'react'
import SectionTitle from '../(components)/SectionTitle'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'

import { LuSave, LuX } from "react-icons/lu"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema } from './formSchema'
import type { IProductSchema } from './formSchema'
import UIForm from './(components)/UIForm'

import { toast } from 'react-hot-toast'
import { apiRequest } from '@/hooks/apiRequest'

import { Category, Products, Image } from '@prisma/client'
import { $Enums } from '@prisma/client'

interface ProductFormProps {
  product?: Products & {
    images: Image[]
  } | null;
  category: Category[]
}

const ProductForm: FC<ProductFormProps> = ({ product, category }) => {
    const router = useRouter()

    const isUpdate = !!product

    const initialValues: IProductSchema = {
      type: $Enums.ProductType.spice,
      availability: $Enums.AvailablityStatus.IN_STOCK,
      isNew: true,
      isBestseller: false,
      name: "",
      description: "",
      features: "",
      price: 0,
      category: "",
      images: []
    }
    //@ts-ignore
    const defaultValues: IProductSchema = isUpdate ? {
      productId: product.id,
      availability: product.availability,
      isNew: product.isNew,
      isBestseller: product.isBestseller,
      type: product.type,
      name: product.name,
      description: product.description,
      features: product.features,
      price: product.price,
      discount: product.discount,
      category: product.categoryId ?? "",
      images: product.images
    } : initialValues

    const form = useForm<IProductSchema>({
      resolver: zodResolver(ProductSchema),
      defaultValues,
      mode: 'onBlur'
    })

    const statusMessages = {
      loading: isUpdate ? "Збереження змін" : "Створення нового товару",
      success: isUpdate ? "Товар оновлено" : "Товар створено",
      error: "Помилка"
    }

    async function saveProduct (data: IProductSchema) {
      console.log(data);
      if (data.images.length === 0) return toast.error("Додайте зображення")
      try {
          toast.promise(apiRequest({url: "/api/product", method: isUpdate ? "PUT" : "POST", data}),{
            loading: statusMessages.loading,
            success: () => {
              router.push('/adminpanel/products')
              return statusMessages.success
            },
            error: statusMessages.error
          })
      } catch (e: any) {
        console.log(e);
      }
    }

    function handleReset () {
      form.reset()
      router.push('/adminpanel/products')
    }
    return (
      <div>
          <SectionTitle title='Створення товару'>
              <Button variant="admin"
                onClick={form.handleSubmit(saveProduct)}
              >
                  <LuSave className="text-lg" />
                  Зберегти
              </Button>
              <Button variant="admin" className='h-10 w-10 p-1 hover:bg-red-500'
                onClick={handleReset}
              >
                  <LuX className='text-lg' />
              </Button>
          </SectionTitle>
          <div className='pt-6'>
            <UIForm form={form} category={category} />
          </div>
      </div>
    )
}

export default ProductForm