import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";


const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";
const url=process.env.DATABASE_URL
const user = process.env.DB_USERNAME ;
const password = process.env.DB_PASSWORD ;
const database = process.env.DB_DATABASE ;
const jwtSecret = process.env.JWT_SECRET || null;

const mainDbConn = {
  url: `${process.env.DATABASE_URL}`,
};

export default {
  port,
  user,
  password,
  database,
  host,
  jwtSecret,
  mainDbConn,
};
