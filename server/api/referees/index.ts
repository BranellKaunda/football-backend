import { defineHandler } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";
import { getQuery } from "h3";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.name && { firstName: { ilike: `%${query.name}%` } },
    query.name && { lastName: { ilike: `%${query.name}%` } },
    query.location && { location: { ilike: `%${query.location}%` } },
    query.dob && { dob: query.dob },
  ].filter(Boolean);

  const results = await useDrizzle().query.referees.findMany({
    where: {
      OR: OR as any,
    },
    orderBy: { firstName: "asc" },
  });

  return results;
});
