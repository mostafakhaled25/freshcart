"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, registerSchemaType } from '@/schema/Register.shema'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'



export default function Register() {

  const router = useRouter()
   
const form =   useForm<registerSchemaType>({
    defaultValues : {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"" ,
    },
    resolver : zodResolver(registerSchema)
  })
  
  const {handleSubmit} = form

  function handleRegister(values : registerSchemaType) {
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then((res)=>{
      if (res.data.message = "succes") {
        toast.success("Registration Succefully" , {
          duration : 3000 , 
          position : "top-center"
        })
       router.push("/login")
      }
    })
    .catch((err)=>{
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {
          duration : 3000 , 
          position : "top-center"
        })
      
    })
  }
  
return <>
  <div className="container w-[90%] lg:w-[50%] mx-auto my-5">
    
    <div className="text-center mb-8 mt-6">
      {/* أيقونة المستخدم مع تأثير خلفية دائرية متداخلة */}
      <div className="relative inline-flex mb-4">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>
        <div className="relative bg-linear-to-tr from-emerald-500 to-teal-400 p-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
          <i className="fa-solid fa-user-plus text-2xl text-white"></i>
        </div>
      </div>

      {/* نصوص ترحيبية مشجعة */}
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Create Account
      </h1>
      <p className="text-gray-500 dark:text-slate-400 mt-2 font-medium w-[85%] mx-auto">
        Join our community and start shopping today
      </p>

      {/* شريط خطوات بسيط (يعطي شكل جمالي) */}
      <div className="flex items-center justify-center gap-1 mt-5">
        <span className="h-1.5 w-8 bg-emerald-500 rounded-full"></span>
        <span className="h-1.5 w-2 bg-gray-200 dark:bg-slate-700 rounded-full"></span>
        <span className="h-1.5 w-2 bg-gray-200 dark:bg-slate-700 rounded-full"></span>
      </div>
    </div>

    <form 
      onSubmit={handleSubmit(handleRegister)} 
      className="mt-12 max-w-md mx-auto p-8 bg-linear-to-br from-white via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl shadow-xl border dark:border-slate-800"
    >

      {/* Name Field */}
      <FieldGroup className="mb-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full">
              <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Name</FieldLabel>
              <Input
                {...field}
                type="text"
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
      <FieldGroup className="mb-5">
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

      {/* Confirm Password Field */}
      <FieldGroup className="mb-5">
        <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Confirm Password</FieldLabel>
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

      {/* Phone Field */}
      <FieldGroup className="mb-6">
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Phone</FieldLabel>
              <Input
                {...field}
                type="tel"
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

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300"
      >
        Register
      </Button>

      {/* Extra */}
      <p className="text-center mt-4 text-gray-500 dark:text-slate-400">
        Already have an account? <a href="/login" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Login</a>
      </p>
    </form>
  </div>
</>
}
