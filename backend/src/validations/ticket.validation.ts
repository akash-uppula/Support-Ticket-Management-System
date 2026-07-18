import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(5),

  description: z.string().min(10),

  category: z.enum([
    "Technical",
    "Billing",
    "Account",
    "Bug",
    "Feature Request",
  ]),

  priority: z.enum(["Low", "Medium", "High"]).optional(),
});
