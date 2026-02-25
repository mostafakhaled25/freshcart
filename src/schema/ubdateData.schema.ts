import z from "zod"
export const updateUserDataSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

export type updateUserDataType = z.infer<typeof updateUserDataSchema>;