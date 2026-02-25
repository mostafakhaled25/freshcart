import z from "zod"

export const registerSchema = z.object({
  name: z.string()
    .nonempty("This field can't be empty")
    .min(2, "Minimum length is 2 char")
    .max(20, "Maxmum length is 20 char ")
    .regex(/^[A-Za-z\s'-]+$/ , "Numbers are not allowed"),

  email: z.email()
    .nonempty("This field can't be empty"),

  password: z.string()
    .min(6, "At least 6 characters")
    .nonempty("This field can't be empty"),

  rePassword: z.string()
    .nonempty("This field can't be empty"),

  phone: z.string()
    .regex(/^01[0125][0-9]{8}$/, "Must be Egyptian number"),
})
.refine((obj) => {
  return obj.password === obj.rePassword
}, {
  error: "Password and RePassword not matched",
  path: ["rePassword"]
})

export type registerSchemaType = z.infer<typeof registerSchema>