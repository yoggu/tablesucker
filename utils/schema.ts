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

export const GameFormSchema = z.object({
  season_id: z.number().int(),
  team_red: z.object({
    score: z.string().refine((value) => parseInt(value) >= 0, {
      message: "Score must be a non-negative number",
    }),
    players: z.array(z.number().int()).min(1, {
      message: "At least one player is required.",
    }),
  }),
  team_blue: z.object({
    score: z.string().refine((value) => parseInt(value) >= 0, {
      message: "Score must be a non-negative number",
    }),
    players: z.array(z.number().int()).min(1, {
      message: "At least one player is required.",
    }),
  }),
});
