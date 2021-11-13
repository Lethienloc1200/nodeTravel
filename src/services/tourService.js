import res from "express/lib/response";
import db from "../models/index";

let createNewTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Tour.create({
        place: data.place,
        money: data.money,
        description: data.description,
        way: data.way,
        vehicle: data.vehicle,
        hotel: data.hotel,
        image: data.image,
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

let getAlltours = (tourId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tours = "";

      if (tourId === "ALL") {
        tours = await db.Tour.findAll({});
      }
      if (tourId && tourId !== "ALL") {
        tours = await db.Tour.findOne({
          where: { id: tourId },
        });
      }
      resolve(tours);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTour = (tourId) => {
  return new Promise(async (resolve, reject) => {
    let tour = await db.Tour.findOne({
      where: { id: tourId },
    });
    if (!tour) {
      resolve({
        errCode: 2,
        errMessage: "the tour khoong toon  tai",
      });
    }
    await db.Tour.destroy({
      where: { id: tourId },
    });

    resolve({
      errCode: 0,
      errMessage: "the tour is deleted",
    });
  });
};
let updateTourData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "missing required parameters",
        });
      }
      let tour = await db.Tour.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (tour) {
        tour.place = data.place;
        tour.way = data.way;
        tour.description = data.description;
        tour.vehicle = data.vehicle;
        tour.money = data.money;
        tour.hotel = data.hotel;

        if (data.image) {
          tour.image = data.image;
        }
        await tour.save();

        resolve({
          errCode: 0,
          errMessage: "update the tour succeeds !",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Useer is not found !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// ======top tour from home======
let getTopTourHomeService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tours = await db.Tour.findAll({
        limit: limitInput,
        // where: { roleId: "R2" },

        order: [["createdAt", "DESC"]],

        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: tours,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailTourByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: -1,
          errMessage: "missing required parameters",
        });
      } else {
        let data = await db.Tour.findOne({
          where: { id: inputId },
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
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
  createNewTour: createNewTour,
  getAlltours: getAlltours,
  deleteTour: deleteTour,
  updateTourData: updateTourData,
  getTopTourHomeService: getTopTourHomeService,
  getDetailTourByIdService: getDetailTourByIdService,
};
