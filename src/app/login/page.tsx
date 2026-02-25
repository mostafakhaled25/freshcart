"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { loginSchema, loginSchemaType } from '@/schema/login.schema';
import { signIn } from 'next-auth/react';
import Link from 'next/link';


export default function Login() {

   
const form =   useForm<loginSchemaType>({
    defaultValues : {
    email:"",
    password:"",
    },
    resolver : zodResolver(loginSchema)
  })
  
  const {handleSubmit} = form

  async function handleLogin(values : loginSchemaType) {


 
      const res = await signIn("credentials" , {
      email : values.email , 
      password : values.password,
      redirect : false ,
    
    }
    )

    if (res?.ok) {
      toast.success("Login Succefully" , {
          duration : 3000 , 
          position : "top-center"
          
        })
        window.location.href = "/"
    } else{
       toast.error(res?.error, {
          duration : 3000 , 
          position : "top-center"
        })
    }
    
    
    

  }
  
return <>
  <div className="container w-[85%] lg:w-[50%] mx-auto my-5">
    
    <div className="text-center mb-8">
      <div className="relative inline-flex mb-4">
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></span>
        <div className="relative bg-linear-to-tr from-emerald-500 to-teal-400 p-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
          <i className="fa-solid fa-lock-open text-white text-2xl"></i>
        </div>
      </div>

      <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight mb-2">
        Welcome Back!
      </h1>
      <p className="text-gray-500 dark:text-slate-400 font-medium">
        Please enter your details to sign in
      </p>
      
      <div className="flex justify-center mt-4">
        <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
        <div className="w-2 h-1 bg-emerald-300 dark:bg-emerald-700 rounded-full ml-1"></div>
      </div>
    </div>
       
    <form 
      onSubmit={handleSubmit(handleLogin)} 
      className="mt-12 max-w-md mx-auto p-8 bg-linear-to-br from-white via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl shadow-xl border dark:border-slate-800"
    >
      {/* Email Field */}
      <FieldGroup className="mb-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Email</FieldLabel>
              <Input
                {...field}
                type="email"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 dark:bg-slate-800 dark:text-white ${
                  fieldState.invalid
                    ? 'border-red-500 focus:ring-red-300 dark:focus:ring-red-900/50'
                    : 'border-gray-300 dark:border-slate-700 focus:ring-emerald-300 dark:focus:ring-emerald-900/50'
                } focus:outline-none focus:ring-2`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Password Field */}
      <FieldGroup className="mb-6">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Password</FieldLabel>
              <Input
                {...field}
                type="password"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 dark:bg-slate-800 dark:text-white ${
                  fieldState.invalid
                    ? 'border-red-500 focus:ring-red-300 dark:focus:ring-red-900/50'
                    : 'border-gray-300 dark:border-slate-700 focus:ring-emerald-300 dark:focus:ring-emerald-900/50'
                } focus:outline-none focus:ring-2`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {/* Forgot Password Link - تمت إضافته هنا */}
<div className="flex justify-end mb-6">
  <Link 
    href="/forgotPassword" 
    className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
  >
    Forgot Password?
  </Link>
</div>


      {/* Submit Button */}
      <Button
        type="submit"
        className="cursor-pointer w-full py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300"
      >
        Login
      </Button>

      {/* Extra */}
      <p className="text-center mt-4 text-gray-500 dark:text-slate-400">
        Don&apos;t have an account? <Link href="/register" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Register</Link>
      </p>
    </form>
  </div>
</>
}
