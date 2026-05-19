import { defineHandler } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const result = await useDrizzle().query.referees.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
  });

  return result;
});
