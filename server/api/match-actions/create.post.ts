import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { useDrizzle } from "~/server/utils/drizzle";
import { match_actions } from "~/server/database/schema";

const schema = z.object({
  playerId: z.int().positive().optional(),
  playerIdExtra: z.int().positive().optional(),
  teamId: z.int().positive().optional(),
  matchId: z.int().positive(),
  action: z
    .enum([
      "Goal",
      "Own Goal",
      "Assist",
      "Yellow Card",
      "Second Yellow Card",
      "Red Card",
      "Substitution",
      "Penalty",
    ])
    .optional(),
  minute: z.int().min(0).max(120),
});

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);

  const result = await db.insert(match_actions).values(body).returning();

  event.res.status = 201;

  return result[0];
});
