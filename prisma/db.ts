import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

const noSoftDeleteTables = ["Session", "Account", "VerificationToken"];

prisma.$use(async (params, next) => {
  if (noSoftDeleteTables.includes(params.model || "")) {
    return next(params);
  }
  if (params.action === "findUnique" || params.action === "findFirst") {
    params.action = "findFirst";
    params.args.where["deletedAt"] = null;
  }
  if (params.action === "findMany") {
    if (params.args.where) {
      if (params.args.where.deleted === undefined) {
        params.args.where["deletedAt"] = null;
      }
    } else {
      params.args["where"] = { deletedAt: null };
    }
  }
  return next(params);
});

prisma.$use(async (params, next) => {
  if (noSoftDeleteTables.includes(params.model || "")) {
    return next(params);
  }
  if (params.action == "update") {
    params.action = "updateMany";
    params.args.where["deletedAt"] = null;
  }
  if (params.action == "updateMany") {
    if (params.args.where !== undefined) {
      params.args.where["deletedAt"] = null;
    } else {
      params.args["where"] = { deletedAt: null };
    }
  }

  return next(params);
});

prisma.$use(async (params, next) => {
  if (noSoftDeleteTables.includes(params.model || "")) {
    return next(params);
  }
  if (params.action == "delete") {
    params.action = "update";
    params.args["data"] = { deletedAt: new Date() };
  }
  if (params.action == "deleteMany") {
    params.action = "updateMany";
    if (params.args.data != undefined) {
      params.args.data["deletedAt"] = new Date();
    } else {
      params.args["data"] = { deletedAt: new Date() };
    }
  }
  return next(params);
});
