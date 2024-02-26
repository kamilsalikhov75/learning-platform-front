import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, { message: "Минимум 1 символ" }),
});
