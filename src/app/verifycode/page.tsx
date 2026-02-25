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


const verifyCodeSchema = z.object({
  resetCode: z.string().min(1, "Reset code is required").max(6, "Code must only 6 digit "),
});

type verifyCodeType = z.infer<typeof verifyCodeSchema>;

export default function VerifyCode() {
  const router = useRouter()

  const form = useForm<verifyCodeType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyCodeSchema)
  })

  const { handleSubmit, formState: { isSubmitting } } = form

  async function handleVerifyCode(values: verifyCodeType) {
    try {
      // الـ URL بناءً على الصورة التي أرفقتها
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);

    
      
      
      if (data.status === "Success") {
        toast.success("Code verified successfully!", {
          duration: 3000,
          position: "top-center"
        });
        router.push("/resetpassword"); 
      }
    } catch {
      toast.error( "Invalid or expired code", {
        duration: 3000,
        position: "top-center"
      });
    }
  }

  return (
    <div className="container w-[85%] lg:w-[50%] mx-auto my-5">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="relative inline-flex mb-4">
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></span>
          <div className="relative bg-linear-to-tr from-emerald-500 to-teal-400 p-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
            <i className="fa-solid fa-at text-white text-2xl"></i>
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight mb-2">
          Verify Reset Code
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium">
          Please enter the 6-digit code sent to your email.
        </p>
        
        <div className="flex justify-center mt-4">
          <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
          <div className="w-2 h-1 bg-emerald-300 dark:bg-emerald-700 rounded-full ml-1"></div>
        </div>
      </div>

      {/* Form Section */}
      <form 
        onSubmit={handleSubmit(handleVerifyCode)} 
        className="mt-12 max-w-md mx-auto p-8 bg-linear-to-br from-white via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl shadow-xl border dark:border-slate-800"
      >
        <FieldGroup className="mb-8">
          <Controller
            name="resetCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Verification Code</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter ex - 123456"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  className={`w-full px-4 py-3 rounded-xl border text-center text-xl tracking-widest font-bold transition-all duration-300 dark:bg-slate-800 dark:text-white ${
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

        <Button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer w-full py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="text-center mt-6">
          <Link 
            href="/forgotPassword" 
            className="text-sm text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            Resend Code?
          </Link>
        </div>
      </form>
    </div>
  )
}