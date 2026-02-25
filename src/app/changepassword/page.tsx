"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { z } from 'zod';
import { changePassword } from '@/loggedAction/updateLoggedPassword';


const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  password: z.string().min(6, "New password must be at least 6 characters"),
  rePassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
});

export type updatePasswordType = z.infer<typeof updatePasswordSchema>;

export default function UpdateLoggedPassword() {
  const router = useRouter();

   

  const form = useForm<updatePasswordType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updatePasswordSchema)
  });

  const { handleSubmit, formState: { isSubmitting } } = form;

  async function handleUpdatePassword(values: updatePasswordType) {
    try {
      
      const data  = await changePassword(values)

      console.log(data);
      
      
      if (data.message === "success") {
        toast.success("Password updated successfully!", { position: "top-center" });
        router.push("/profile");
      }
    } catch {
      toast.error( "Check your current password", {
        position: "top-center"
      });
    }
  }

  return (
    <div className="container w-[85%] lg:w-[50%] mx-auto my-5">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="relative inline-flex mb-4">
          <div className="relative bg-emerald-500 p-4 rounded-2xl shadow-lg">
            <i className="fa-solid fa-key text-white text-2xl"></i>
          </div>
        </div>
        <h1 className="text-3xl font-black text-gray-800 dark:text-white">Change Password</h1>
        <p className="text-gray-500">Keep your account secure with a strong password.</p>
      </div>

      <form 
        onSubmit={handleSubmit(handleUpdatePassword)} 
        className="mt-12 max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800"
      >
        <FieldGroup className="space-y-6 mb-8">
          
          {/* Current Password */}
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">Current Password</FieldLabel>
                <Input {...field} type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* New Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">New Password</FieldLabel>
                <Input {...field} type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Confirm New Password */}
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">Confirm New Password</FieldLabel>
                <Input {...field} type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

        </FieldGroup>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  )
}