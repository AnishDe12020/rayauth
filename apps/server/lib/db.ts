import {
  PrismaClient,
  Project,
  ProjectMember,
  User,
  ProjectMemberRole,
  ClientSecret,
} from "@prisma/client";

export {
  PrismaClient,
  Project,
  ProjectMember,
  User,
  ProjectMemberRole,
  ClientSecret,
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
