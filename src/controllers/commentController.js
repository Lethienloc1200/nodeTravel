import res from "express/lib/response";
import commentService from "../services/commentService";

let handleGetAllComments = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing requires parameter",
      comments: [],
    });
  }

  let comments = await commentService.getAllComments(id);

  console.log(comments);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    comments,
  });
};
// let handleCreateNewComment = async (req, res) => {
//   console.log(message);
//   let message = await commentService.createNewComment(req.body);
//   return res.status(200).json(message);
// };

// =======comment bu id tour==========
let postInforComments = async (req, res) => {
  try {
    let response = await commentService.saveDetailsInforComment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server post Comment details",
    });
  }
};
let getDetailCommentById = async (req, res) => {
  try {
    let inforDetail = await commentService.getDetailCommentByIdService(
      req.query.id
    );
    return res.status(200).json(inforDetail);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server get Comment details",
    });
  }
};
module.exports = {
  getDetailCommentById: getDetailCommentById,
  postInforComments: postInforComments,
  // handleCreateNewComment: handleCreateNewComment,
  handleGetAllComments: handleGetAllComments,
};
