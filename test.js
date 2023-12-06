const Mocha = require("mocha");
const fs = require("fs");
const nodemailer = require("nodemailer");
const EmailReporter = require('mocha-email-reporter');

function readFileOrEmptyString(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return "";
  }
}

const mocha = new Mocha();

mocha.addFile("unit-tests.js");
mocha.reporter(EmailReporter, { output: "test-report.html" });

mocha.run((failures) => {
  const reportPath = 'test-report.html';
  const testReport = readFileOrEmptyString(reportPath);

  if (testReport.length) {
    const transporter = nodemailer.createTransport({
      host: "charfi.me",
      port: 25,
      auth: {
        user: "mp@charfi.me",
        pass: "#Ismail123456",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "mp@charfi.me",
      to: "ismail@charfi.me",
      subject: `Test Reports - ${new Date().toLocaleString()}`,
      html: testReport,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error:", error);
      }
      console.log("Email sent:", info.response);
    });
  } else {
    console.log("no report");
  }

  process.exitCode = failures ? 1 : 0;
});
