import { getQuery } from "h3";
import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.name && { name: { ilike: `%${query.name}%` } },
    query.location && { location: { ilike: `%${query.location}%` } },
  ].filter(Boolean);

  const teams = await useDrizzle().query.teams.findMany({
    where: { OR: OR as any },
    orderBy: { name: "asc" },
  });

  return teams;
});
