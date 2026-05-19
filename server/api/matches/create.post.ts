import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";
import { readValidatedBody } from "h3";
import { matches } from "~/server/database/schema";
import { matchSchema } from "~/server/utils/validation/matchSchema";

const schema = matchSchema;

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);

  const result = await db
    .insert(matches)
    .values({
      ...body,
      matchDate: body.matchDate.toISOString(),
    })
    .returning();

  return result[0];
});
