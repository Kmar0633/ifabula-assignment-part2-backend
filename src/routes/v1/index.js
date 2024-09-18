import express from "express";
import user from "./handlers/user.js";
import book from "./handlers/book.js";
const router = express.Router();
router.post("/signup", user.createUser);
router.get("/customers",user.getAllCustomers)
router.post("/login", user.login);
router.get("/book", book.get);
router.put("/book/:id", book.update);
export default router;
