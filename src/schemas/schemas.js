import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(2, "Street is required"),
  houseNo: z.string().min(1, "House No is required"),
  pincode: z.string(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
});
