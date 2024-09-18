import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Form } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema, cn } from '@/lib/utils'


const formSchema = authFormSchema('sign-up');

interface ICustomFormFieldInput {
    control: Control<z.infer<typeof formSchema>>,
    name: any,
    placeholder: string,
    label: string,
    fieldClassName: string
}

const CustomFormFieldInput = ({control, name, placeholder, label, fieldClassName} : ICustomFormFieldInput) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
            <FormLabel className='form-label'>{label}</FormLabel>
            <div className={cn('flex flex-col w-full', {'flex gap-4' : fieldClassName.length > 0} )}>
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