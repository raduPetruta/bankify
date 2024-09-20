'use client'
import {formFieldsSignUp, formFieldsSignIn} from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import {any, z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import CustomFormFieldInput from './CustomFormFieldInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import SignUp from '@/app/(auth)/sign-up/page'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
 

const AuthForm = ({type} : {type : string}) => {
  
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false)
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  }) 

  const onSubmit = async (formValues: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    setIsLoading(true) 

    try { //sign up with Appwrite
      
      //handle sign up
      if(type === 'sign-up'){ 
        const userData = {
          firstName: formValues.firstName!,
          lastName: formValues.lastName!,
          address: formValues.address!,
          city: formValues.city!,
          state: formValues.state!,
          postalCode: formValues.postalCode!,
          dateOfBirth: formValues.dateOfBirth!,
          ssn: formValues.ssn!,
          email: formValues.email,
          password: formValues.password,
          dwollaCustomerUrl: "dwolla",
          dwollaCustomerId: "dwolla"
        }

        const newUser = await signUp(userData);
        setUser(newUser);
        
        if(user)
          router.push("/")
      }

      //handle sign in
      if(type === 'sign-in') {
        const userData = {
          email: formValues.email,
          password: formValues.password,
        }
        const userDataResponse = await signIn(userData);
        if(userDataResponse)
          router.push("/")
      }
    } 
    catch (error) {
      console.log(error)
    } 
    finally {
      setIsLoading(false)
    }

    console.log(formValues)
  }

  return ( 
    <section className='auth-form'>
        <header className='flex felx-col gap-5 md:gap-8'>
            <Link href="/" className='cursor-pointer items-center gap-1 flex'> 
                <Image src="/icons/logo.svg" width={34} height={34} alt='logo'/>
                <h1 className="sidebar-logo text-26 font-igm-plex-serif font-bold text-tblack-1"> Bankify </h1>
            </Link>
            
            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                   {user ? 'Sign in' : type === 'sign-in' ? 'Sign-in' : 'Sign-up'}
                   <p className='text-16 font-normal text-gray-600'>
                      {user ? 'Link you account to get started.' : 'Please enter your details.'}
                   </p>
                </h1>
            </div>
        </header>
        
        {type === 'sign-in' ? 
        ( 
          /*Sign In Form*/
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {
                /*Form fields for signin */
                formFieldsSignIn.map((field) => {
                  return ( 
                    <CustomFormFieldInput 
                      control = {form.control} 
                      name={field.name}
                      placeholder={field.placeholder} 
                      label={field.label}
                      fieldClassName={field.fieldClassName} 
                    /> 
                  )
                }) 
              }

              {/*Submit form button with loading*/}
              <div className="flex-col flex gap-4">
                <Button type="submit" className='form-btn' disabled={isLoading}>
                  {
                    isLoading ?  
                        <> <Loader2 size={20} className='animate-spin'/> &nbsp; Loading... </>                
                    :
                        type === 'sign-in' ? 'Sign In' : 'Sign Up'
                  }
                </Button>
              </div>

            </form>
          </Form>
        )    
        : 
        (
          /*Sign Up Form*/
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {
                /*Form fields for signUp */
                formFieldsSignUp.map((field) => {
                  return ( 
                    <CustomFormFieldInput 
                      control = {form.control}
                      name={field.name}
                      placeholder={field.placeholder} 
                      label={field.label}
                      fieldClassName={field.fieldClassName} 
                    /> 
                  )
                }) 
              }

              {/*Submit form button with loading*/}
              <div className="flex-col flex gap-4">
                <Button type="submit" className='form-btn' disabled={isLoading}>
                  {
                    isLoading ?  
                        <> <Loader2 size={20} className='animate-spin'/> &nbsp; Loading... </>                
                    :
                        type === 'sign-in' ? 'Sign In' : 'Sign Up'
                  }
                </Button>
              </div>

            </form>
          </Form>
        ) 
        }
        <footer className='flex justify-center gap-1'>
          <p className='text-14 font-normal text-gray-500'>
            {type === 'sign-in' ? "Don't have an account? " : "Already have an account?  "}
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
              {type === 'sign-in' ? 'Create account' : 'Sign in'}
            </Link>
          </p>
        </footer>
   
    </section>
  )
}

export default AuthForm