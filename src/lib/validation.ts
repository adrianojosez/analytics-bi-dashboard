import { z } from "zod";

export const dashboardQuerySchema = z.object({
  period: z.enum(["30d", "quarter", "year"]).default("quarter"),
  tenantId: z.string().default("northstar-labs"),
});
