import res from "express/lib/response";
import db from "../models/index";

let createNewComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.create({
        star: data.star,

        description: data.description,
      });
      resolve({
        errCode: 0,
        message: "oke",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllComments = (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comments = "";

      if (commentId === "ALL") {
        comments = await db.Comment.findAll({});
      }
      if (commentId && commentId !== "ALL") {
        comments = await db.Comment.findOne({
          where: { id: commentId },
        });
      }
      resolve(comments);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewComment: createNewComment,
  getAllComments: getAllComments,
};
