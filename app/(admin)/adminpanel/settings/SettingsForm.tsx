"use client"

import { FC } from 'react'
import { useState } from 'react'

import { Form } from '@/components/ui/form'
import SectionTitle from '../(components)/SectionTitle'
import FormInput from '@/components/ui/form/FormInput'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { LuPencil, LuSave, LuX } from 'react-icons/lu'

import toast from 'react-hot-toast'
import { apiRequest } from '@/hooks/apiRequest'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { settingsSchema } from './formSchema'
import type { ISettingsSchema } from './formSchema'
import { Admin } from '@prisma/client'

interface settingsFormProps {
    user: Admin
}

const SettingsForm: FC<settingsFormProps> = ({ user }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isView, setIsView] = useState<boolean>(false) // show/hide password
    const router = useRouter()

    const defaultValues: ISettingsSchema = {
        userId: user.id,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        password: user.password,
    }

    const form = useForm<ISettingsSchema>({
        resolver: zodResolver(settingsSchema),
        defaultValues,
        mode: "onBlur"
    })
    const statusMessages = {
        loading: "Збереження змін...",
        success: "Зміни збережено",
        error: "Помилка"
    }
    async function updateAdmin (data: ISettingsSchema) {
        try {
            toast.promise(apiRequest({
                url: "/api/user",
                method: "PUT",
                data
            }), {
                loading: statusMessages.loading,
                success: () => {
                  setIsEdit(false);
                  router.refresh();
                  return statusMessages.success
                },
                error: statusMessages.error
            })
        } catch (e) {
            console.log(e);
        }
    }

    const handleReset = () => {
        setIsEdit(state => !state)
        form.reset()
    }

    return (
        <div>
            <SectionTitle title="Налаштування">
                {
                    isEdit ?
                    <div className='flex items-center gap-x-2'>
                        <Button variant="admin" onClick={form.handleSubmit(updateAdmin)} >
                            <LuSave className="text-xl" />
                            Зберегти
                        </Button>
                        <Button variant="admin" className='h-10 w-10 p-1 hover:bg-red-500'
                          onClick={handleReset}
                        >
                            <LuX className='text-lg' />
                        </Button>
                    </div> :
                        <Button variant="admin" onClick={handleReset} >
                            <LuPencil className="text-xl" />
                            Редагувати
                        </Button>
                }
            </SectionTitle>
            <div 
                className='pt-6 select-none'
                style={!isEdit ? {opacity: "0.7", pointerEvents: "none"} : {}}
            >
                <Form {...form}>
                    <div className='grid grid-cols-2 gap-x-4'>
                        <div className='flex flex-col gap-y-4'>
                            <FormInput
                                name="name"
                                control={form.control}
                                type="text"
                                label="Ім'я"
                            />
                            <FormInput 
                                name="surname"
                                control={form.control}
                                type="text"
                                label="Прізвище"
                            />
                            <FormInput 
                                name="phone"
                                control={form.control}
                                type="text"
                                label="Номер телефону"
                            />
                            <FormInput
                                name="password"
                                control={form.control}
                                type={isView ? "text" : "password"}
                                label="Пароль"
                            />
                            <div className='flex flex-col gap-y-2'>
                                <div className='flex gap-x-4 items-center'>
                                    <Checkbox
                                    checked={isView}
                                    onCheckedChange={() => {
                                        setIsView(state => !state)
                                    }}
                                    />
                                    <Label>
                                    Показати пароль
                                    </Label>
                                </div>
                            </div>

                            {/* <Button
                                className='w-full flex items-center gap-x-2 mt-4'
                                onClick={form.handleSubmit(updateAdmin)}
                            >
                                <LuSave className="text-lg" />
                                Зберегти
                            </Button> */}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SettingsForm