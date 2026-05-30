import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { useDrizzle } from "~/server/utils/drizzle";
import { match_actions } from "~/server/database/schema";
import { eq } from "drizzle-orm";

const schema = z.object({
  playerId: z.int().positive().optional(),
  playerIdExtra: z.int().positive().optional(),
  teamId: z.int().positive().optional(),
  matchId: z.int().positive().optional(),
  action: z.enum([
    "Goal",
    "Own Goal",
    "Assist",
    "Yellow Card",
    "Second Yellow Card",
    "Red Card",
    "Substitution",
    "Penalty",
  ]).optional(),
  minute: z.int().min(0).max(120).optional(),
});

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);
  const id = event.context.params?.id;

  const result = await db
    .update(match_actions)
    .set(body)
    .where(eq(match_actions.id, Number(id)))
    .returning();

  return result[0];
});
