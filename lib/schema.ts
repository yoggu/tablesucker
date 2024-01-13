import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const PlayerFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
  image_url: z.string().optional(),
});

export const GameFormSchema = z
  .object({
    season_id: z.string().refine((value) => parseInt(value) >= 0, {
      message: "Season ID must be a number",
    }),
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
  })
  .superRefine((data, ctx) => {
    // Check if the scores are the same
    if (parseInt(data.team_red.score) === parseInt(data.team_blue.score)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["team_blue", "score"],
        message: "Team blue score cannot be the same as team red score",
      });
    }

    // Check if there are common players
    const hasCommonPlayers = data.team_red.players.some((playerId) =>
      data.team_blue.players.includes(playerId),
    );

    if (hasCommonPlayers) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["team_blue", "players"],
        message: "Team blue players cannot be the same as team red players",
      });
    }
  });

export const SeasonFormSchema = z
  .object({
    start_date: z.date({
      required_error: "Please enter a start date",
      invalid_type_error: "Not a valid date",
    }),
    end_date: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    const { start_date, end_date } = data;

    // Check if end_date is after start_date
    if (end_date && start_date && end_date <= start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end_date"],
        message: "End date must be after the start date",
      });
    }
  });
