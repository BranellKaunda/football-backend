import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit";
import { leagues } from "~/server/database/schema";
import { eq } from "drizzle-orm";

const leagueSchema = z.object({
  name: z.string().min(3).max(50).transform(capitalize),
  season: z.string().min(2).max(9),
  rank: z.number().positive(),
});

const patchLeague = leagueSchema.partial();

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const id = event.context.params?.id;
  const body = await readValidatedBody(event, patchLeague);

  const result = await db
    .update(leagues)
    .set(body)
    .where(eq(leagues.id, Number(id)))
    .returning();

  return result[0];
});
