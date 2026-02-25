import z from "zod"

export const CheckoutSchema = z.object({

  details: z.string()
    .nonempty("This field can't be empty").min(5 ,  "datails is required" ),

  phone: z.string()
    .nonempty("This field can't be empty").regex(/^01[0125][0-9]{8}$/, "Must be Egyptian number") , 

  city : z.string()
    .nonempty("City name is required").min(5 ,  "City name is required" )

})


export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>