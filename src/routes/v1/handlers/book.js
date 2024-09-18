import db from "../../../../db/db.js";
import helper from "../helpers/helper.js";
import config from "../../../../config/config.js";
const { main } = db;

const get = async (req, res, next) => {
  try {
    const book = await main.masterBook.findMany({
      include: {
        MasterUser: true,
      },
    });

    return res.json({
      status: 200,
      message: "get Book succesfully",
      data: book,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { borrowedDate, dueDate,user,isBorrowed } =
    req.body;

    const dataToUpdate = {
      borrowedDate: borrowedDate ? new Date(borrowedDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      // Conditionally connect or disconnect the MasterUser based on isBorrowed
      ...(isBorrowed ? {
        MasterUser: {
          connect: {
            id: user.id
          }
        }
      } : {
        MasterUser: {
          set: []
        }
      })
    };
    const book = await main.masterBook.update({
      data: dataToUpdate,
      where: { id: parseInt(id) },
    });

    return res.json({
      status: 200,
      message: "update Book succesfully",
      data: book,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export default {
  update,
  get,
};
