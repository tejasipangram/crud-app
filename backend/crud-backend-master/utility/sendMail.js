import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendEmail = (mailDetails) => {
  transporter.sendMail(mailDetails, (err, data) => {
    if (!err) {
      console.log("Mail sent success fully");
    } else {
      console.log("something went wrong ", err);
    }
  });
};
