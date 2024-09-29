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
    const { id } = req.params;
    const { tableName, fields } = req.body;

    const fieldNames = fields.map(field => field.name);
    console.log("fieldNames",fieldNames)
    const data = await main.masterApiTable.create({
        data: {
            tableName: tableName,
            fieldNamesSelected:fieldNames
        },
      });


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


export default {
  create,

};
