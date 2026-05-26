import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const result = await useDrizzle().query.playersXmatches.findFirst();

  return result;
});
