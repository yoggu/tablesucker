import * as z from "zod";

export const PlayerFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
});
