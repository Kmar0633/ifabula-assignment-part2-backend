import jwt from "jsonwebtoken";
import db from "../../../../db/db.js";
import helper from "../helpers/helper.js";
import config from "../../../../config/config.js";
const { main } = db;
const login = async (req, res, next) => {
  try {
    console.log("try")
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({
        status: "error",
        message: "No username/ No Password provided",
      });
    }
    const findUser = await main.masterUser.findFirst({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist",
      });
    }
    const passwordMatch =
      password == helper.decodeText(findUser.password).replace(/\0/g, "");
    if (!passwordMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Login Failed: Wrong Password",
      });
    }

    let token = "";
    const data = {email: email}
    token = jwt.sign(data, config.jwtSecret);

    return res.status(200).json({
    status: 200,
    message: "user successfully logged in",
      data: {
        token,
        ...data,
      },
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return res.json({
        status: 400,
        message: "No email/ No Password provided",
      });
    }

    const findUser = await main.masterUser.findFirst({
      where: {
        email: email,
      },
    });

    if (findUser) {
      return res.json({
        status: 400,
        message: "Email already exists",

      });
    }

    const user = await main.masterUser.create({
        data: {
          email: email,
          password: helper.encryptText(password),
          role:"customer"
        },
     
      });
     
    return res.json({
      status: 200,
      message: "user created",
      data: user,
    });
  } catch (e) {
    console.log(e)
    next(e);
  }
};

const getAllCustomers = async (req, res, next) => {
  try {
    const users = await main.masterUser.findMany({

      where:{
        role:"customer"
      }
    });

    return res.json({
      status: 200,
      message: "get users succesfully",
      data: users,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export default {
  login,
  createUser,
  getAllCustomers,
};
