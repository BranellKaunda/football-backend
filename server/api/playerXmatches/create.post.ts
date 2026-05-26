import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { useDrizzle } from "~/server/utils/drizzle";
import { playersXmatches } from "~/server/database/schema";

const playersXmatchesSchema = z.object({
  playerId: z.int().positive(),
  matchId: z.int().positive(),
});

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, playersXmatchesSchema);

  const result = await db.insert(playersXmatches).values(body).returning();

  event.res.status = 201;

  return result[0];
});
