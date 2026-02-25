import z from "zod"

export const loginSchema = z.object({

  email: z.email()
    .nonempty("This field can't be empty"),

  password: z.string()
    .min(6, "At least 6 characters")
    .nonempty("This field can't be empty"),

})


export type loginSchemaType = z.infer<typeof loginSchema>