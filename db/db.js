import { PrismaClient } from "@prisma/client";
import config from "../config/config.js";
const main = new PrismaClient({ datasources: { db: config.mainDbConn } });

PrismaClient;
export default {
  main,
};
