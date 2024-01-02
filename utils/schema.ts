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
