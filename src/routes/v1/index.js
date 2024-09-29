import express from "express";
import user from "./handlers/user.js";
import book from "./handlers/book.js";
import tableApi from "./handlers/tableApi.js";
import table from "./handlers/table.js";
import view from "./handlers/view.js";
const router = express.Router();
router.post("/signup", user.createUser);
router.get("/customers",user.getAllCustomers)
router.post("/create-table",table.create)
router.post("/create-table-api",tableApi.create)
router.post("/insert-values/:tableName",table.createData)
router.post("/create-view",view.create)
router.get("/get-table",table.get)
router.post("/login", user.login);
router.get("/book", book.get);
router.put("/book/:id", book.update);
export default router;
