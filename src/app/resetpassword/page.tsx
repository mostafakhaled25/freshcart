"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { z } from 'zod';


const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type resetPasswordType = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter()

  const form = useForm<resetPasswordType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema)
  })

  const { handleSubmit, formState: { isSubmitting } } = form

  async function handleResetPassword(values: resetPasswordType) {
    try {

      const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
      
      if (data.token) {
        toast.success("Password updated successfully!", {
          duration: 3000,
          position: "top-center"
        });
      
        router.push("/login"); 
      }
    } catch {
      toast.error( "Email is not Same Your Email", {
        duration: 3000,
        position: "top-center"
      });
    }
  }

  return (
    <div className="container w-[85%] lg:w-[50%] mx-auto my-5">
   
      <div className="text-center mb-8">
        <div className="relative inline-flex mb-4">
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></span>
          <div className="relative bg-linear-to-tr from-emerald-500 to-teal-400 p-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
            <i className="fa-solid fa-lock-open text-white text-2xl"></i>
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight mb-2">
          Reset Password
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium">
          Create a new secure password for your account.
        </p>
        
        <div className="flex justify-center mt-4">
          <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
          <div className="w-2 h-1 bg-emerald-300 dark:bg-emerald-700 rounded-full ml-1"></div>
        </div>
      </div>

     
      <form 
        onSubmit={handleSubmit(handleResetPassword)} 
        className="mt-12 max-w-md mx-auto p-8 bg-linear-to-br from-white via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl shadow-xl border dark:border-slate-800"
      >
        <FieldGroup className="space-y-6 mb-8">
        
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Email Address</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 dark:bg-slate-800 dark:text-white ${
                    fieldState.invalid ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-300`}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">New Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 dark:bg-slate-800 dark:text-white ${
                    fieldState.invalid ? 'border-red-500' : 'border-gray-300 dark:border-slate-700'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-300`}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer w-full py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>

        <div className="text-center mt-6">
          <Link 
            href="/login" 
            className="text-sm text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            Cancel and Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}