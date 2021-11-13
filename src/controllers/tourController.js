import res from "express/lib/response";
import tourService from "../services/tourService";

let handleGetAlltours = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing requires parameter",
      tours: [],
    });
  }

  let tours = await tourService.getAlltours(id);

  console.log(tours);
  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    tours,
  });
};
let handleCreateNewTour = async (req, res) => {
  console.log(message);
  let message = await tourService.createNewTour(req.body);
  return res.status(200).json(message);
};

let handleDeleteTour = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await tourService.deleteTour(req.body.id);
  return res.status(200).json(message);
};

let handleEditTour = async (req, res) => {
  let data = req.body;
  let message = await tourService.updateTourData(data);
  return res.status(200).json(message);
};

//========= top tour home
let getTopTourHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await tourService.getTopTourHomeService(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      message: "erro  tour top from server ",
    });
  }
};
let getDetailTourById = async (req, res) => {
  try {
    let inforDetail = await tourService.getDetailTourByIdService(req.query.id);
    return res.status(200).json(inforDetail);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "err from server get tour details",
    });
  }
};
module.exports = {
  handleCreateNewTour: handleCreateNewTour,
  handleGetAlltours: handleGetAlltours,
  handleDeleteTour: handleDeleteTour,
  handleEditTour: handleEditTour,
  getTopTourHome: getTopTourHome,
  getDetailTourById: getDetailTourById,
};
