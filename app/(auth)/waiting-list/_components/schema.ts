import { z } from "zod";

export const waitingListSchema = z.object({
  // Step 1: Basic Information
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  website: z.string().optional(),

  // Step 2: Professional Details
  role: z.enum(["builder", "architect", "designer", "student", "other"]),
  expertise: z.string().min(1, "Expertise is required"),
  experience: z.string().min(1, "Experience is required"),
  bio: z.string().min(1, "Bio is required"),

  // Step 3: Portfolio
  about: z.string().optional(),
  image: z.any().refine((files) => files?.length > 0, "Image is required"),

  // Step 4: Community
  isRoleTitle: z
    .boolean()
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select an option",
    }),
  isAvailable: z
    .boolean()
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select an option",
    }),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

export type WaitingListFormData = z.infer<typeof waitingListSchema>;
