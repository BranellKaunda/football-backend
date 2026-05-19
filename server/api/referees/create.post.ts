import { defineHandler } from "h3";
import { readValidatedBody } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";
import { referees } from "~/server/database/schema";
import * as z from "zod";
import { capitalize } from "es-toolkit/string";

const schema = z.object({
  firstName: z.string().min(2).transform(capitalize),
  lastName: z.string().min(2).transform(capitalize),
  dob: z.coerce.date(),
  location: z.string().min(2).transform(capitalize),
});

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);

  const result = await db
    .insert(referees)
    .values({ ...body, dob: body.dob.toISOString() })
    .returning();

  event.res.status = 201;

  return result[0];
});
