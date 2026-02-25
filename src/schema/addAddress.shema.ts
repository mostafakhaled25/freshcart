import { z } from 'zod';

export const addAddressSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  details: z.string().min(5, "Please provide more details"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "City name is too short"),
});

export type addAddressType = z.infer<typeof addAddressSchema>;