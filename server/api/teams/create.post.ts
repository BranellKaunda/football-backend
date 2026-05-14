import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit/string";
import { useDrizzle } from "~/server/utils/drizzle";
import { teams } from "~/server/database/schema";

const teamSchema = z.object({
  name: z.string().min(2).transform(capitalize),
  logo: z.string(),
  location: z.string().min(2).transform(capitalize),
});

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, teamSchema);

  const result = await db.insert(teams).values(body).returning();

  event.res.status = 201;

  return result[0];
});
