import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();



// https://www.geeksforgeeks.org/node-js/email-verification/  (Visit this url to understand the NodeMailer)

export const sendOTPMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // const token = jwt.sign({
  //         data: 'Token Data'  .
  //     }, 'ourSecretKey', { expiresIn: '10m' }
  // );

  const mailConfigurations = {
    // It should be a string of sender/server email
    from: process.env.MAIL_USER,

    to: email,

    // Subject of Email
    subject: "Password Reset OTP",

    // This would be the text of email body
    html: `<h1>Your OTP For Password Reset Is <br>${otp}</br></h1>`
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("OTP Sent Successfully");
    console.log(info);
  });
};
