import db from "../../../../db/db.js";
import helper from "../helpers/helper.js";
import pkg from "pg"; // Use default import
const { Client } = pkg;
import { Prisma } from "@prisma/client";
import config from "../../../../config/config.js";
const { main } = db;
const client = new Client({
  host: config.dbHost,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.dbPort,
});
client.connect();

const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tableName, data } = req.body;

    const createTableQuery = `
 CREATE TABLE  ${tableName} (
   ${data
     .map((entry) => {
       const columnDefinition = `${entry.fieldName} ${entry.dataType.id}`;
       return entry.isPrimaryKey
         ? `${columnDefinition} PRIMARY KEY`
         : columnDefinition;
     })
     .join(",\n")}
 );
`;
    console.log(await client.query(createTableQuery));

    return res.json({
      status: 200,
      message: "create table succesfully",
      data: data,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const pickKeys = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

const createData = async (req, res, next) => {
  try {
    const { tableName } = req.params;
    const tableAPi = await main.masterApiTable.findUnique({
      where: {
        tableName: tableName,
      },
    });
  
    const columns = Object.keys(req.body[0]);
    const values = req.body.map(row => columns.map(column => row[column]));

  //  const sqlColumns = `(${filteredBody.join(", ")})`;

console.log("va",values)
const formattedString = `(${values[0].map(item => `'${item}'`).join(', ')})`;


/*     const tablesQuery = await main.$queryRaw`
  INSERT INTO ${tableName} (${Prisma.raw(columns.join(', '))})
  VALUES (patrick,book);
` */
console.log("col",columns)
const createTableQuery = `
 INSERT INTO "${tableName}" (${columns.join(', ')})
  VALUES ${formattedString}
`;
await client.query(createTableQuery)

    return res.json({
      status: 200,
      message: "insert data succesfully",
      data: "insert data successfully",
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const tablesQuery = await main.$queryRaw`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public';
      `;

    // Step 2: Initialize an array to hold the final result
    const result = [];

    // Step 3: Iterate through each table and fetch its fields
    for (const table of tablesQuery) {
      const tableName = table.table_name;

      const fieldsQuery = await main.$queryRaw`
          SELECT column_name
          FROM information_schema.columns
          WHERE table_name = ${tableName} AND table_schema = 'public';
        `;

      // Step 4: Extract field names into an array
      const fields = fieldsQuery.map((field) => field.column_name);

      const api = await main.masterApiTable.findUnique({
        where: { tableName: tableName },
      });
      // Step 5: Push the formatted object into the result array
      result.push({
        tableName: tableName,
        fields: fields,
        isApiGenerated: api ? true : false,
      });
    }
    return res.json({
      status: 200,
      message: "get table succesfully",
      data: result,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export default {
  create,
  get,
  createData,
};
