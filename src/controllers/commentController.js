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
let handleCreateNewComment = async (req, res) => {
  console.log(message);
  let message = await commentService.createNewComment(req.body);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewComment: handleCreateNewComment,
  handleGetAllComments: handleGetAllComments,
};
