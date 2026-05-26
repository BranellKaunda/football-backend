import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";
import { playersXmatches } from "~/server/database/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

const playersXmatchesSchema = z.object({
  playerId: z.int().positive(),
  matchId: z.int().positive(),
});

const schema = playersXmatchesSchema.partial();

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);
  const id = event.context.params?.id;

  const result = await db
    .update(playersXmatches)
    .set(body)
    .where(eq(playersXmatches.id, Number(id)))
    .returning();

  return result[0];
});
