const mailer = require("nodemailer");

const sendingMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "archidesai0301@gmail.com",
      pass: "sevq nrua djfg gxiq",
    },
  });

  const mailOptions = {
    from: "archidesai0301@gmail.com",
    to: to,
    subject: subject,
    // text: text,
    html:text
  };

  const mailResponse = await transporter.sendMail(mailOptions);
  console.log(mailResponse);
  return mailResponse;
};

module.exports = { sendingMail };
