require("dotenv").config;
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"LÊ THIỆN LỘC👻" <abcit2000@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Xác nhận đặt tour du lịch ✔", // Subject line

    html: `
    <h3>Lộc boy đây</h3>
    <p>MAIL XÁC NHẬN ĐẶT TOUR CỦA ${dataSend.name}</p>
    <p>Thông tin xác nhận</p>
    <div>Tour: ${dataSend.nameTour}</div>
    <div>Sdt: ${dataSend.sdt}</div>
    <div>Ngày đi: ${dataSend.dayBooking}</div>
    <div>Ghi chú: ${dataSend.note}</div>

    <p>Vui lòng xác nhận link bên dưới để hoàn tất thủ tục đặt lịch</p>
    <a href="http://localhost:3000/bookingok">Xác nhận</a>
    <p>Mọi thắc mắc xin liên hê: </p>
    <a href="http://facebook.com/lethienloc1200">facebook : lethienloc1200</a>
    <a href="">SDT: 0123456789</a>
    
    `,
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
