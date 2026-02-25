"use client"
import { useContext, useState } from 'react'; // عشان نفرق بين نوع الدفع
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import { CheckoutSchema, CheckoutSchemaType } from '@/schema/checkout.schema';
import { checkPayment } from '@/CheckoutAction/checkout.Action';
import { cashPayment } from '@/CheckoutAction/cash.action';
import { CartContext } from '@/context/CartContext';

export default function Checkout() {
  const { id }: { id: string } = useParams();
  const router = useRouter();

  console.log(id);



  const [paymentType, setPaymentType] = useState<'cash' | 'card'>('card');
  const { setCountCart} = useContext(CartContext)!

  const form = useForm<CheckoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(CheckoutSchema)
  });

  const { handleSubmit, formState: { isSubmitting } } = form;

  async function handleCheckout(values: CheckoutSchemaType) {
    try {
      if (paymentType === 'card') {
        const res = await checkPayment(id, values);
        if (res.status === "success") {
          toast.success("Redirecting to payment gateway...");
          setCountCart(0)


        } else {
          toast.error("Online payment failed, please try again.");
        }
      } else {
        const res = await cashPayment(id, values);
        if (res.status === "success") {
          toast.success("Order placed successfully with Cash!");
          router.push('/allorders');
          setCountCart(0)

        } else {
          toast.error("Cash order failed, please try again.");
        }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="container w-[85%] lg:w-[50%] mx-auto my-5">
      <div className="text-center mb-8">
        <div className="relative inline-flex mb-4">
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></span>
          <div className="relative bg-linear-to-tr from-emerald-500 to-teal-400 p-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
            <i className="fa-brands fa-amazon-pay text-white text-3xl"></i>
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight mb-2">
          Checkout Now
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium">
          Choose your payment method and enter details
        </p>

        <div className="flex justify-center mt-4">
          <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
          <div className="w-2 h-1 bg-emerald-300 dark:bg-emerald-700 rounded-full ml-1"></div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleCheckout)}
        className="mt-12 max-w-md mx-auto p-8 bg-linear-to-br from-white via-emerald-50 to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl shadow-xl border dark:border-slate-800"
      >
        {/* Details Field */}
        <FieldGroup className="mb-5">
          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Address Details</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="e.g. 123 Street, Building 4"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 dark:bg-slate-800 dark:text-white ${fieldState.invalid ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-emerald-300'
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
                <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">Phone Number</FieldLabel>
                <Input
                  {...field}
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 dark:bg-slate-800 dark:text-white ${fieldState.invalid ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-emerald-300'
                    } focus:outline-none focus:ring-2`}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* City Field */}
        <FieldGroup className="mb-8">
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="block text-gray-700 dark:text-slate-200 font-medium mb-2">City</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="Cairo"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 dark:bg-slate-800 dark:text-white ${fieldState.invalid ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-emerald-300'
                    } focus:outline-none focus:ring-2`}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {/* زرار الفيزا */}
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => setPaymentType('card')}
            className="cursor-pointer w-full py-6 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-300"
          >
            {isSubmitting && paymentType === 'card' ? "Processing..." : "Pay with Visa"}
          </Button>

          {/* زرار الكاش */}
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={() => setPaymentType('cash')}
            className="  cursor-pointer w-full py-6 bg-emerald-600 dark:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 transform hover:scale-[1.02] transition-all duration-300"
          >
            {isSubmitting && paymentType === 'cash' ? "Placing Order..." : "Cash on Delivery"}
          </Button>
        </div>
      </form>
    </div>
  );
}