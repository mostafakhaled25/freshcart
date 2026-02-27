"use client"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { addAddressSchema, addAddressType } from '@/schema/addAddress.shema';
import { addAddress } from '@/addressAction/addAddress';


export default function AddAddress() {
  const router = useRouter();

  const form = useForm<addAddressType>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(addAddressSchema)
  });

  const { handleSubmit, formState: { isSubmitting } } = form;

  async function handleAddAddress(values: addAddressType) {
    try {
      const data = await addAddress(values);

      if (data.status === "success" || data.message === "success") {
        toast.success("Address added successfully!", { position: "top-center" });
        router.push("/profile"); 
      } else {
        toast.error(data.message || "Failed to add address", { position: "top-center" });
      }
    } catch{
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="container w-[85%] lg:w-[50%] mx-auto my-5">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="relative inline-flex mb-4">
          <div className="relative bg-green-500 p-4 rounded-2xl shadow-lg">
            <i className="fa-solid fa-map-location-dot text-white text-2xl"></i>
          </div>
        </div>
        <h1 className="text-3xl font-black text-gray-700 dark:text-white">Add New Address</h1>
        <p className="text-gray-500">Add a new delivery address to your account.</p>
      </div>

      <form 
        onSubmit={handleSubmit(handleAddAddress)} 
        className="mt-12 max-w-md mx-auto p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800"
      >
        <FieldGroup className="space-y-6 mb-8">
          
          {/* Address Name (e.g., Home, Work) */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">Address Label</FieldLabel>
                <Input {...field} type="text" placeholder="e.g. Home, Office" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Details */}
          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">Address Details</FieldLabel>
                <Input {...field} type="text" placeholder="Street, Building, Floor..." className="w-full px-4 py-3 rounded-xl border" />
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

          {/* City */}
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-gray-700 dark:text-slate-200">City</FieldLabel>
                <Input {...field} type="text" placeholder="e.g. Cairo, Giza" className="w-full px-4 py-3 rounded-xl border" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

        </FieldGroup>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer w-full py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all"
        >
          {isSubmitting ? "Adding Address.." : "Add Address"}
        </Button>
      </form>
    </div>
  )
}