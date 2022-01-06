import res from "express/lib/response";
import db from "../models/index";
import emailService from "../services/emailService";
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
        location: data.location,
        map: data.map,
        image: data.image,
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
        contentHTML: data.contentHTML,
        contentMarkdown: data.contentMarkdown,
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

// ======BOOKING TOUR===============
let createNewBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await emailService.sendSimpleEmail({
        name: data.name,
        receiverEmail: data.email,
        nameTour: data.nameTour,
        sdt: data.sdt,
        dayBooking: data.dayBooking,
        note: data.note,
      });

      await db.Booking.create({
        name: data.name,
        sdt: data.sdt,
        email: data.email,
        note: data.note,
        nameTour: data.nameTour,
        dayBooking: data.dayBooking,
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

let getAllBookings = (bookingId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let booking = "";

      if (bookingId === "ALL") {
        booking = await db.Booking.findAll({});
      }
      if (bookingId && bookingId !== "ALL") {
        booking = await db.Booking.findOne({
          where: { id: bookingId },
        });
      }
      resolve(booking);
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
        tour.location = data.location;
        tour.map = data.map;
        tour.image1 = data.image1;
        tour.image2 = data.image2;
        tour.image3 = data.image3;
        tour.contentHTML = data.contentHTML;
        tour.contentMarkdown = data.contentMarkdown;

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
  createNewBooking: createNewBooking,
  getAllBookings: getAllBookings,
};
