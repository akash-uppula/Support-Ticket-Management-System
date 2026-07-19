import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  category: z.enum([
    "Technical",
    "Billing",
    "Account",
    "Bug",
    "Feature Request",
  ]),

  priority: z.enum(["Low", "Medium", "High"]).optional(),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
