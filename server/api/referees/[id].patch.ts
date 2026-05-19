import { defineHandler } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";
import { referees } from "~/server/database/schema";
import { eq } from "drizzle-orm";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit/string";

const schema = z.object({
  firstName: z.string().min(2).transform(capitalize),
  lastName: z.string().min(2).transform(capitalize),
  dob: z.coerce.date(),
  location: z.string().min(2).transform(capitalize),
});

const partialSchema = schema.partial();

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, partialSchema);
  const id = event.context.params?.id;

  const result = await db
    .update(referees)
    .set({ ...body, dob: body.dob?.toISOString() })
    .where(eq(referees.id, Number(id)))
    .returning();

  return result[0];
});
