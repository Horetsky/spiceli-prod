import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import type { IPostSchema } from '../formSchema'

import { Form } from '@/components/ui/form'
import FormSelect from '@/components/ui/form/FormSelect'
import FormInput from '@/components/ui/form/FormInput'
import FormTextarea from '@/components/ui/form/FormTextarea'

import { $Enums } from '@prisma/client'

interface UIFormProps {
    form: UseFormReturn<IPostSchema>
}

const UIForm: FC<UIFormProps> = ({ form }) => {
    return (
        <Form {...form}>
            <div className='grid grid-cols-2 gap-x-4'>
                <div className='flex flex-col gap-y-4'>
                  <FormSelect
                      name="type"
                      control={form.control}
                      label="Тип поста"
                      placeholder={'Виберіть тип товару'}
                      options={[
                          {label: 'Відео', value: $Enums.PostType.video},
                        //   {label: 'Стаття', value: 'article'},
                      ]}
                  />
                  <FormInput
                      name="title"
                      control={form.control}
                      label="Назва поста"
                  />
                  <FormTextarea 
                    name="description"
                    control={form.control}
                    label="Опис поста"
                  />
                  <FormInput
                      name="link"
                      control={form.control}
                      label="Посилання"
                      description='Вкажіть посилання на Youtube відео'
                  />
                </div>
                <div className='max-h-[350px] relative p-2 border-[1px] rounded-md overflow-hidden mt-8'>
                    {
                        form.getValues("link") && !form.getFieldState("link").invalid ?
                            <Video url={form.getValues("link")?.split("/")[3]}/>
                        :
                        <div className="absolute text-customSecondary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            Завантажте відео
                        </div>
                    }
                </div>
            </div>
        </Form>
    )
}

const Video = ({ url }:{url: string}) => {
    return (
        <iframe 
            className='w-full h-full aspect-video'
            src={`https://www.youtube.com/embed/${url}`} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
        </iframe>
    )
}
export default UIForm