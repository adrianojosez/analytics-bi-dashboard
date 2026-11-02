type PrismaClientLike = {
  tenant: {
    findFirst: (...args: unknown[]) => Promise<unknown>;
  };
  [key: string]: unknown;
};

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientLike;
};

const fallbackPrisma: PrismaClientLike = {
  tenant: {
    findFirst: async () => null,
  },
};

export const prisma = globalForPrisma.prisma ?? fallbackPrisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
