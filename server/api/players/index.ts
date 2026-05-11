import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";
import { getQuery } from "h3";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.name && { firstName: { ilike: `%${query.name}%` } },
    query.name && { lastName: { ilike: `%${query.name}%` } },
    query.position && { position: { ilike: `%${query.position}%` } },
    query.dob && { dob: query.dob },
  ].filter(Boolean);

  const players = await useDrizzle().query.players.findMany({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      position: true,
      dob: true,
    },
    with: {
      team: true,
    },
    where: { OR: OR as any },
  });

  return players;
});
