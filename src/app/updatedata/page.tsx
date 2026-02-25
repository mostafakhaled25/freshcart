"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateUserDataSchema, updateUserDataType } from '@/schema/ubdateData.schema';
import { ubdateData } from '@/loggedAction/ubdateData.action';
import { useSession } from 'next-auth/react';


export default function UpdateUserData() {
 const { update  } = useSession();
 const { data: session } = useSession()
  const router = useRouter();

  const form = useForm<updateUserDataType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateUserDataSchema)
  });

  const { handleSubmit, formState: { isSubmitting } } = form;

async function handleUpdateData(values: updateUserDataType) {
  try {
    const data = await ubdateData(values);

    if (data.message === "success") {
      await update({
        ...session,
        user: {
          ...session?.user,
          name: values.name,
          email: values.email,
        }
      });

      toast.success("Data updated successfully!", { position: "top-center" });
      router.push("/profile");
    } else {
      toast.error(data.errors?.msg || "Update failed", { position: "top-center" });
    }
  } catch {
  }
}
   
  

  return (
    <div className="container w-[85%] lg:w-[50%] mx-auto my-5">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="relative inline-flex mb-4">
          <div className="relative bg-blue-500 p-4 rounded-2xl shadow-lg">
            <i className="fa-solid fa-user-pen text-white text-2xl"></i>
          </div>
        </div>
        <h1 className="text-3xl font-black text-gray-800 dark:text-white">Update Profile</h1>
        <p className="text-gray-500">Keep your personal information up to date.</p>
      </div>

      <form 
        onSubmit={handleSubmit(handleUpdateData)} 
        className="mt-12 max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800"
      >
        <FieldGroup className="space-y-6 mb-8">
          
          {/* User Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">Full Name</FieldLabel>
                <Input {...field} type="text" placeholder="Mostafa Hasanein" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email Address */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">Email Address</FieldLabel>
                <Input {...field} type="email" placeholder="example@gmail.com" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Phone Number */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">Phone Number</FieldLabel>
                <Input {...field} type="tel" placeholder="01010700700" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

        </FieldGroup>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer w-full py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all"
        >
          {isSubmitting ? "Saving Changes..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}