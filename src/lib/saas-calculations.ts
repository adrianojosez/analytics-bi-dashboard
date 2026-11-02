type RevenueRow = {
  newCustomers: number;
  cancellations: number;
  activeCustomers: number;
  averagePlanPrice: number;
};

export function calculateMRR(rows: RevenueRow[]) {
  const total = rows.reduce((sum, row) => sum + row.activeCustomers * row.averagePlanPrice, 0);
  return total;
}

export function calculateARR(mrr: number) {
  return mrr * 12;
}

export function calculateChurn(rows: RevenueRow[]) {
  const totalCustomers = rows.reduce((sum, row) => sum + row.activeCustomers, 0);
  const cancellations = rows.reduce((sum, row) => sum + row.cancellations, 0);

  if (totalCustomers === 0) {
    return 0;
  }

  return (cancellations / totalCustomers) * 100;
}

export function calculateLTV(rows: RevenueRow[]) {
  const averageProductRevenue =
    rows.reduce((sum, row) => sum + row.activeCustomers * row.averagePlanPrice, 0) /
    Math.max(1, rows.reduce((sum, row) => sum + row.activeCustomers, 0));

  const averageRetention = 1 - calculateChurn(rows) / 100;
  return averageProductRevenue / Math.max(0.05, 1 - averageRetention);
}
