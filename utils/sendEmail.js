const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "jovanny.runolfsdottir@ethereal.email",
        pass: "h3Za78Q4R9cErp9Ywr",
      },
    });

    await transporter.sendMail({
      from: "jovanny.runolfsdottir@ethereal.email",
      to: email,
      subject: subject,
      html: `Click following link to activate your account:<br/> <a href="${link}">${link}</a>`,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
