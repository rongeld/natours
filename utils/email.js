const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    // activate in gmail 'less secure app' option
  });

  // 2) define email options
  const mailOptions = {
    from: 'Andrii Zakrevskyi <andrew@gmail.com>',
    to: options.email,
    subject: options.subject,
    next: options.next,
    text: options.message
  };

  // 3) send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
