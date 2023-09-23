"use client"

import { FC } from 'react'

import Image from 'next/image'
import { CldUploadWidget } from "next-cloudinary"

import ClientProvider from '@/providers/client-component-provider'
import { Button } from '../ui/button'
import { LuTrash2, LuPlus } from 'react-icons/lu'

interface ImageUploadProps {
  values: string[]
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void
}

const ImageUpload: FC<ImageUploadProps> = ({ values, onChange, onRemove, disabled }) => {
    const onUpload = (res: any) => {
        console.log('RESULT', res)
        onChange(res.info.secure_url);
    }
    return (
        <ClientProvider>
            <div className='flex flex-col gap-y-4'>
                <div className='flex items-center flex-wrap gap-4 min-h-[200px] p-2 border-[1px] rounded-md'>
                    {
                        values.length === 0 &&
                            <div className='text-center text-customSecondary select-none w-full'>Додайте зображення продукту</div>
                    }
                    {
                        values.map(url => (
                            <div key={url} className='relative rounded-[8px] overflow-hidden w-[200px] h-[200px]'>
                                <div className='z-50 absolute top-2 right-2'>
                                    <Button variant="admin" className='h-10 w-10 p-1 hover:bg-red-500'
                                    onClick={() => onRemove(url)}
                                    >
                                        <LuTrash2 className='text-lg' />
                                    </Button>
                                </div>
                                <Image
                                    src={url}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    alt='product'
                                />
                            </div>
                        ))
                    }
                </div>
                <CldUploadWidget onUpload={onUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}>
                    {
                        ({ open }) => {
                            const onClick = () => open()
                            return (
                                <div>
                                    <Button variant="admin" disabled={disabled} onClick={onClick} className='w-full'>
                                        <LuPlus className="text-lg" />
                                        Додати
                                    </Button>
                                </div>
                            )
                        }
                    }
                </CldUploadWidget>
            </div>
        </ClientProvider>
      )
}

export default ImageUpload