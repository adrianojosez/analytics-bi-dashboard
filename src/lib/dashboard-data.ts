import { prisma } from "@/lib/prisma";
import { withCachedValue } from "@/lib/redis";
import { mockDashboardData } from "@/lib/mock-data";
import { dashboardQuerySchema } from "@/lib/validation";
import { DashboardData } from "@/types/saas";

export async function getDashboardData(input: { period?: string; tenantId?: string }): Promise<DashboardData> {
  const params = dashboardQuerySchema.parse(input);
  const cacheKey = `dashboard:${params.tenantId}:${params.period}`;

  return withCachedValue(cacheKey, async () => {
    if (process.env.DATABASE_URL) {
      try {
        const tenant = await prisma.tenant.findFirst({
          where: { slug: params.tenantId },
          include: { subscriptions: true },
        });

        if (tenant) {
          return mockDashboardData;
        }
      } catch {
        // Fallback to the mock dataset when Postgres is unavailable.
      }
    }

    return mockDashboardData;
  });
}
