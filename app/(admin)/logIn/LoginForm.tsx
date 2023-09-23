"use client"

import { FC } from 'react'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/form/FormInput'
import { toast } from 'react-hot-toast'

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { useForm } from 'react-hook-form'
import { loginSchema } from './formSchema'
import type { ILoginSchema } from './formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'

const LoginForm: FC = () => {

  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur"
  })

  const seaechParams = useSearchParams();
  const router = useRouter()
  const callbackUrl = seaechParams.get('callbackUrl') || '/adminpanel'
  
  const handleLogin = async (data: ILoginSchema) => {
    console.log("submit");
    try {
        await toast.promise(
            signIn("credentials", {
                redirect: false,
                email: "ADMIN",
                password: data.password,
                callbackUrl
            }),
            {
                loading: 'Завантаження...',
                success: (res) => {
                    if (res?.error) throw new Error(res.error)
                    router.push(callbackUrl)
                    return "Успішно!"
                },
                error: (err) => `Помилка: ${err.message}`,
            }
        )
    } catch (e) {
        console.log(e);
    }

  }

  return (
    <div className='w-[20vw]'>
      <Form {...form}>
          <form className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(handleLogin)}
          >
              <FormInput 
                  name="password"
                  control={form.control}
                  label="Пароль"
              />

          <Button variant="default" className='w-full justify-center' type="submit" disabled={!form.formState.isValid}>Увійти</Button>
          </form>
      </Form>
    </div>
  )
}

export default LoginForm