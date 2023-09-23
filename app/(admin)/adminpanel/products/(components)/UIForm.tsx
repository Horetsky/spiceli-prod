"use client"

import { FC } from 'react'
import { useState, useEffect } from 'react'

import { UseFormReturn } from 'react-hook-form'
import type { IProductSchema } from '../formSchema'

import { 
  Form, 
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import FormSelect from '@/components/ui/form/FormSelect'
import FormInput from '@/components/ui/form/FormInput'
import FormTextarea from '@/components/ui/form/FormTextarea'
import FormCheckbox from '@/components/ui/form/FormCheckbox'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import ImageUpload from '@/components/imageUpload/ImageUpload'

import { Category } from '@prisma/client'
import { $Enums } from '@prisma/client'

interface UIFormProps {
  form: UseFormReturn<IProductSchema>
  onSubmit?: () => void;
  category: Category[]
}

const UIForm: FC<UIFormProps> = ({ form, category }) => {
  const [isDiscount, setIsDiscount] = useState<boolean>(!!form.getValues("discount"))
  useEffect(() => {
    if (!isDiscount) form.setValue("discount", "" as unknown as number);
  }, [isDiscount])
  return (
    <Form {...form}>
        <div className='grid grid-cols-2 gap-x-4'>
          <div className='flex flex-col gap-y-4'>
            <FormSelect
                name="type"
                control={form.control}
                label={'Тип товару'}
                placeholder={'Виберіть тип товару'}
                options={[
                    {label: 'Приправа', value: $Enums.ProductType.spice},
                    {label: 'Трава', value: $Enums.ProductType.herb},
                    {label: 'Чай', value: $Enums.ProductType.tea},
                ]}
            />
            <FormInput
                name="name"
                control={form.control}
                label="Назва товару"
            />
            <FormTextarea 
              name="description"
              control={form.control}
              label="Опис товару"
            />
            <FormTextarea 
              name="features"
              control={form.control}
              label="Склад товару"
            />
            <FormInput
                name="price"
                control={form.control}
                label="Ціна товару (грн.)"
            />

            <div className='flex flex-col gap-y-2'>
              <div className='flex gap-x-4 items-center'>
                <Checkbox 
                  checked={isDiscount}
                  onCheckedChange={() => {
                    setIsDiscount(state => !state)
                  }}
                />
                <Label>
                  Додати знижку
                </Label>
              </div>
              <div
                style={!isDiscount ? {opacity: "20%", pointerEvents: "none"} : {}}
              >
                <FormInput
                    name="discount"
                    control={form.control}
                    label="Нова ціна товару (грн.)"
                    description="Вкажіть ціну товару зі знижкою"
                />
              </div>
            </div>
            <FormSelect
                name="availability"
                control={form.control}
                label="Статус товару"
                placeholder=""
                description={'Позначте статус товару на складі'}
                options={[
                  {label: 'В наявності', value: $Enums.AvailablityStatus.IN_STOCK},
                  {label: 'Закінчується', value: $Enums.AvailablityStatus.RUNS_OUT},
                  {label: 'Немає в наявності', value: $Enums.AvailablityStatus.OUT_OF_STOCK},
              ]}
            />

            <h1 className='text-primary font-semibold text-lg pt-4'>Додатково</h1>
            <FormCheckbox 
                name="isNew"
                control={form.control}
                label='Позначити як новинку'
                description='Встановіть прапорець, щоб користувачі побачили цей товар як новинку'
            />
            <FormCheckbox 
                name="isBestseller"
                control={form.control}
                label='Позначити як популярний'
                description='Встановіть прапорець, щоб користувачі побачили цей товар як популярний'
            />
            <FormSelect
                name="category"
                control={form.control}
                label="Найкраще додавати"
                placeholder=""
                description={'Порадьте покупцям, до якого продукту найкраще додавати дану приправу'}
                options={[
                  {label: "Немає", value: ""},
                  ...category.map(item => (
                    {label: item.name, value: item.id}
                  ))
                ]}
            />
          </div>

          <div className='mt-2'>
              <FormField 
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem className={'space-y-0 flex flex-col gap-2'}>
                      <FormLabel>Зображення: {field.value?.length ?? 0} / 4</FormLabel>
                      <FormControl>
                          <ImageUpload
                              values={field.value?.map(image => image?.url) ?? []}
                              disabled={field.value?.length === 4}
                              onChange={(url) => field.onChange([...field?.value!, { url }])}
                              onRemove={(url) => field.onChange(field.value?.filter(current => current?.url !== url))}
                          />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
              />
          </div>
        </div>
    </Form>
  )
}

export default UIForm