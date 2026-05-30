import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { getQuery } from "h3";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.playerId && { playerId: query.playerId },
    query.playerId && { playerIdExtra: query.playerId },
    query.action && { action: `%${query.action}%` },
    query.minute && { minute: query.minute },
    query.matchId && { matchId: query.matchId },
    query.teamId && { teamId: query.teamId },
  ].filter(Boolean);

  const results = await useDrizzle().query.match_actions.findMany({
    where: {
      OR: OR as any,
    },
  });

  return results;
});
