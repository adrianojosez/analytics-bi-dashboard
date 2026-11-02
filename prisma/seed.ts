const { PrismaClient, PlanTier, SubscriptionStatus, TransactionStatus } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "northstar-labs" },
    update: {},
    create: {
      name: "Northstar Labs",
      slug: "northstar-labs",
      domain: "northstar.example.com",
      plan: PlanTier.GROWTH,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@northstar.example.com" },
    update: {},
    create: {
      email: "admin@northstar.example.com",
      name: "Analyst Admin",
      password: "hashed-password",
      tenantId: tenant.id,
    },
  });

  const subscriptionData = [
    { planTier: PlanTier.STARTER, monthlyPrice: 49, annualPrice: 468, seats: 5, status: SubscriptionStatus.ACTIVE },
    { planTier: PlanTier.GROWTH, monthlyPrice: 149, annualPrice: 1488, seats: 20, status: SubscriptionStatus.ACTIVE },
    { planTier: PlanTier.SCALE, monthlyPrice: 499, annualPrice: 4980, seats: 80, status: SubscriptionStatus.ACTIVE },
    { planTier: PlanTier.ENTERPRISE, monthlyPrice: 999, annualPrice: 9960, seats: 200, status: SubscriptionStatus.TRIAL },
  ];

  for (const plan of subscriptionData) {
    await prisma.subscription.create({
      data: {
        tenantId: tenant.id,
        planTier: plan.planTier,
        monthlyPrice: plan.monthlyPrice,
        annualPrice: plan.annualPrice,
        seats: plan.seats,
        status: plan.status,
      },
    });
  }

  const snapshotMonths = [
    { month: "Jan", mrr: 92000, arr: 1104000, churnRate: 3.2, averageLtv: 18200, newCustomers: 34, cancelledUsers: 14 },
    { month: "Feb", mrr: 98000, arr: 1176000, churnRate: 3.4, averageLtv: 19000, newCustomers: 41, cancelledUsers: 12 },
    { month: "Mar", mrr: 104000, arr: 1248000, churnRate: 3.1, averageLtv: 19650, newCustomers: 52, cancelledUsers: 13 },
    { month: "Apr", mrr: 112000, arr: 1344000, churnRate: 2.9, averageLtv: 21050, newCustomers: 58, cancelledUsers: 12 },
    { month: "May", mrr: 118000, arr: 1416000, churnRate: 2.6, averageLtv: 22100, newCustomers: 61, cancelledUsers: 11 },
    { month: "Jun", mrr: 126000, arr: 1512000, churnRate: 2.4, averageLtv: 23400, newCustomers: 66, cancelledUsers: 10 },
  ];

  for (const snapshot of snapshotMonths) {
    await prisma.metricSnapshot.create({
      data: {
        tenantId: tenant.id,
        month: snapshot.month,
        mrr: snapshot.mrr,
        arr: snapshot.arr,
        churnRate: snapshot.churnRate,
        averageLtv: snapshot.averageLtv,
        newCustomers: snapshot.newCustomers,
        cancelledUsers: snapshot.cancelledUsers,
      },
    });
  }

  const sampleTransactions = [
    { customer: "Northstar Labs", plan: PlanTier.SCALE, amount: 2400, status: TransactionStatus.PAID },
    { customer: "Summit Studio", plan: PlanTier.GROWTH, amount: 1400, status: TransactionStatus.PAID },
    { customer: "Bluepeak", plan: PlanTier.ENTERPRISE, amount: 6200, status: TransactionStatus.PENDING },
    { customer: "Prism Health", plan: PlanTier.STARTER, amount: 480, status: TransactionStatus.PAID },
  ];

  for (const transaction of sampleTransactions) {
    await prisma.transaction.create({
      data: {
        tenantId: tenant.id,
        customer: transaction.customer,
        plan: transaction.plan,
        amount: transaction.amount,
        status: transaction.status,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
