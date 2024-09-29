import db from "../../../../db/db.js";
import helper from "../helpers/helper.js";
import pkg from "pg"; // Use default import
const { Client } = pkg;

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
    const data=req.body
    const allFieldNames = [];
    Object.entries(data.fields).forEach(([categoryKey, category])=> {
      console.log("test",categoryKey)
        category.forEach(item => {
      
          if (item.isSelected) {
            allFieldNames.push({fieldName: category, tableName: categoryKey,fieldName:item.fieldName });
          }
        });
      });
      console.log("allFieldNames",allFieldNames)
    const createViewQuery = `
    CREATE VIEW ${data.viewName} AS
    SELECT
      ${allFieldNames
        .map((entry) => `"${entry.tableName}"."${entry.fieldName}" AS "${entry.tableName}_${entry.fieldName}" `)
        .join(",\n")}
    FROM "${data.tableNames[0]}"
    ${data.joinType.label ? ` ${data.joinType.label} "${data.tableNames[1]}" ON "${data.tableNames[0]}".${data.field1.value}="${data.tableNames[1]}".${data.field2.value}` : ''};
  `;
  console.log("create view",createViewQuery)
    console.log(await client.query(createViewQuery));

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
        const fields = fieldsQuery.map(field => field.column_name);
    
        // Step 5: Push the formatted object into the result array
        result.push({
          tableName: tableName,
          fields: fields,
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
};
