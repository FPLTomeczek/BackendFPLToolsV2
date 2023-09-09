const nodemailer = require("nodemailer");

const devOptions = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: `${process.env.TEST_EMAIL_USER}`,
    pass: `${process.env.TEST_EMAIL_PASS}`,
  },
};

const prodOptions = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASS}`,
  },
};

const sendEmail = async (email, subject, link) => {
  try {
    const options =
      process.env.NODE_ENV === "development" ? devOptions : prodOptions;
    const transporter = nodemailer.createTransport(options);

    await transporter.sendMail({
      from: `${options.auth.user}`,
      to: email,
      subject: subject,
      html: `Welcome to the FPLTools! We are happy to have you here, Click <a href="${link}" target="_blank" rel="noopener noreferrer">here</a> to activate your account. `,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
