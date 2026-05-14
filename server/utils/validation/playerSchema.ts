import * as z from "zod";
import { capitalize } from "es-toolkit/string";

export const playerSchema = z.object({
  teamId: z.int().positive(),
  firstName: z.string().min(2).transform(capitalize),
  lastName: z.string().min(2).transform(capitalize),
  dob: z.coerce.date(),
  position: z.string().min(2).transform(capitalize),
  weightKg: z.number().int().positive(),
  heightCm: z.number().int().positive(),
});
