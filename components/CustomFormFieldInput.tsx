import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Form } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

interface ICustomFormFieldInput {
    control: Control<z.infer<typeof authFormSchema>>,
    name: any,
    placeholder: string,
    label: string
}

const CustomFormFieldInput = ({control, name, placeholder, label} : ICustomFormFieldInput) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
            <FormLabel className='form-label'>{label}</FormLabel>
            <div className='flex flex-col w-full'>
                <FormControl>
                    <Input className='input-class' placeholder={placeholder} {...field} type={name}/>
                </FormControl>
                <FormMessage className='form-message mt-1'></FormMessage>
            </div>
            </div>
        )}
    />
  )
}

export default CustomFormFieldInput