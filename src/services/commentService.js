import res from "express/lib/response";
import db from "../models/index";

// let createNewComment = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await db.Comment.create({
//         star: data.star,

//         description: data.description,
//       });
//       resolve({
//         errCode: 0,
//         message: "oke",
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

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

// ===========comment by id tour========
let saveDetailsInforComment = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.commentId ||
        !inputData.star ||
        !inputData.description ||
        !inputData.userId
      ) {
        resolve({
          errCode: -1,
          errMessage: "missing parameter commentId",
        });
      } else {
        await db.Comment.create({
          star: inputData.star,
          description: inputData.description,
          commentId: inputData.commentId,
          titleComment: inputData.titleComment,
          typeOf: inputData.typeOf,
          timeTravel: inputData.timeTravel,
          imageComment: inputData.imageComment,
          typeOfHotel: inputData.typeOfHotel,
          userId: inputData.userId,
        });

        resolve({
          errCode: 0,
          errMessage: "oke save infor succeed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailCommentByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: -1,
          errMessage: "missing required parameters",
        });
      } else {
        let data = await db.Tour.findAll({
          where: { id: inputId },

          include: [
            {
              model: db.Comment,
              // attributes: ["description", "star"],
            },
          ],

          raw: false,
          nest: true,
        });
        if (data && data.imageComment) {
          data.imageComment = new Buffer(data.imageComment, "base64").toString(
            "binary"
          );
        }
        if (!data) {
          data = {};
        }

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getDetailCommentByIdService: getDetailCommentByIdService,
  saveDetailsInforComment: saveDetailsInforComment,
  // createNewComment: createNewComment,
  getAllComments: getAllComments,
};
