import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit";
import { leagues } from "~/server/database/schema";

const leagueSchema = z.object({
  name: z.string().min(3).max(50).transform(capitalize),
  season: z.string().min(4).max(9),
  rank: z.number().positive(),
});

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, leagueSchema);

  const result = await db.insert(leagues).values(body).returning();

  event.res.status = 201;

  return result[0];
});
