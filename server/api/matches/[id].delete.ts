import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";
import { matches } from "~/server/database/schema";
import { eq } from "drizzle-orm";

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const id = event.context.params?.id;

  const result = await db
    .delete(matches)
    .where(eq(matches.id, Number(id)))
    .returning();

  event.res.status = 204;

  return result[0];
});
