import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit/string";
import { useDrizzle } from "~/server/utils/drizzle";
import { teams } from "~/server/database/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

const teamSchema = z.object({
  name: z.string().min(2).transform(capitalize),
  logo: z.string(),
  location: z.string().min(2).transform(capitalize),
});

const patchTeamSchema = teamSchema.partial();

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, patchTeamSchema);
  const id = event.context.params?.id;

  const result = await db
    .update(teams)
    .set(body)
    .where(eq(teams.id, Number(id)))
    .returning();

  return result[0];
});
