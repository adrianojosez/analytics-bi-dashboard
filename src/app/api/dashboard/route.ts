import { NextResponse } from "next/server";

import { getDashboardData } from "@/lib/dashboard-data";
import { dashboardQuerySchema } from "@/lib/validation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const payload = {
    period: searchParams.get("period") ?? "quarter",
    tenantId: searchParams.get("tenantId") ?? "northstar-labs",
  };

  const parsed = dashboardQuerySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = await getDashboardData(parsed.data);
  return NextResponse.json(data);
}
