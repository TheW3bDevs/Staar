const express = require("express");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
// app.use(express.json(true));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

//-------------Creating Transporter-------------
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "staarfoods.com@gmail.com",
      // pass: "ukjb odgx mjsa kuy",
      pass: "yezp fkzm wgvv fulq",
    },
  })
);

//----------------Creating promise to executing message
function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
}

//-----------------------------Quote Form Mail-
app.post("/postCart", async (req, res) => {
  let user = req.body;
  console.log(req.body);

  //-----------------------------Mail Sent to Owner
  const mailOptions = {
    from: "Staar Exports And Imports",
    to: "staarfoods.com@gmail.com",
    subject: "Order Details",
    html: `
    <div
    style="
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    
  >
   
    <div>
    <div style="background: #f2f7f2; text-align: center; padding: 10px">
    <h2 style="background: #f2f7f2;font-family: Arial, Helvetica, sans-serif; padding: 10px">
      <i> STAAR</i>

      <span style="font-size: 14px; color: rgb(214, 140, 3)"
        >Exports&Imports</span
      >
    </h2>
  </div>
    <table cellpadding="0" cellspacing="0" border="0" width="400" bgcolor="#ffffff" style="border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);">
    <tr>
        <td style="padding: 20px;">
            <h2 style="color: #0a5a1f; text-align: center; border-bottom: 2px solid #0a5a1f; padding-bottom: 10px;">User Booking Details</h2>

            <table style="width: 100%;">
                <tr >
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Name:</strong>
                    </td>
                    <td>
                        ${user.User.firstName} ${user.User.lastName}
                    </td>
                </tr>
                <br/>
                <tr >
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Email:</strong>
                    </td>
                    <td>
                        ${user.User.email}
                    </td>
                </tr>
                <br/>
                <tr >
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Phone:</strong>
                    </td>
                    <td>
                        ${user.User.phoneNo}
                    </td>
                </tr>
                <br/>
                <tr>
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Address:</strong>
                    </td>
                    <td>
                        ${user.User.address}
                    </td>
                </tr>
            </table>

            <!-- Add more details as needed -->
        </td>
    </tr>
</table>

      <br />
      <table
        style="
          border-collapse: collapse;
          width: 100%;
          background: rgb(235, 234, 234);
        "
      >
        <thead style="background: black; color: white; height: 50px">
          <tr style="border-bottom: 1px solid #ddd">
            <td style="padding: 10px"><b>Image</b></td>
            <td style="padding: 10px"><b>Product_Name</b></td>
            <td style="padding: 10px"><b>Quantity</b></td>
          </tr>
        </thead>
        <tbody>
        ${user.Items.map((data) => {
          return ` <tr style="border-bottom: 1px solid #bdbcbc">
            <td style="padding: 10px">
              <img
                src="${data.productImg}"
                style="
                  width: 100px;
                  height: 100px;
                  object-fit: cover;
                  border-radius: 5px;
                "
                alt="Image"
              />
            </td>
            <td style="padding: 10px">${data.productName}</td>
            <td style="padding: 10px">${data.quantity}kgs</td>
          </tr>`;
        }).join("")}
        </tbody>
      </table>
      <div style="background: #f2f7f2; text-align: center; padding: 10px">
      <div style="text-align: center">
        <a
          href="mailto:office.staareximindialtd@gmail.com"
          style="color: darkgreen; margin-right: 20px"
          >Contact US</a
        >
        <a href="https://staarfoods.com/quote" style="color: darkgreen"
          >Get Quote</a
        >
      </div>
      <h5 style="font-weight: 300">
        CopyRights © 2024 Staar Exports & Imports® Pvt.Limited.
      </h5>
    </div>
    </div>
  </div>
    `,
  };

  //----------------------Mail sent to User
  const mailOptions2 = {
    from: "Staar Exports And Imports",
    to: user.User.email,
    subject: "Order Details",
    html: `
    <div style="font-family: Helvetica, Arial, sans-serif">
    <div style="background: #f2f7f2; text-align: left; padding: 10px">
      <h2 style="font-family: Arial, Helvetica, sans-serif">
        <i> STAAR</i>

        <span style="font-size: 14px; color: rgb(214, 140, 3)"
          >Exports&Imports</span
        >
      </h2>
    </div>
    <div>
      <p style="color: rgb(63, 63, 63)">
        Dear <b> ${user.User.firstName} ${user.User.lastName}</b>,<br /><br />

        Thank you for choosing <i> STAAR</i> Exports&Imports for your recent
        order! We are delighted to have the opportunity to serve you with our
        premium selection of food items, including fine rice, various types of
        flour, and the freshest vegetables.

        <br /><br />Your trust in us is truly appreciated, and we want you to
        know that we are committed to providing you with the highest quality
        products and exceptional service. As you savor the flavors of our
        offerings, we hope they bring joy and satisfaction to your table.

        <br /><br />Your support means the world to us, and we look forward to
        being your go-to source for all your culinary needs. Should you have any
        questions or require further assistance, feel free to reach out to us.
        We value your feedback and are dedicated to continually improving your
        shopping experience.

        <br /><br />Once again, thank you for choosing
        <i> STAAR</i> Exports&Imports. We can't wait to serve you again!

        <br /><br />Best regards,<b><i> STAAR</i> Exports&Imports</b>
      </p>
    </div>
    <div style="background: #f2f7f2; text-align: center; padding: 10px">
    <div style="text-align: center">
    <a
      href="mailto:office.staareximindialtd@gmail.com"
      style="color: darkgreen; margin-right: 20px"
      >Contact US</a
    >
    <a href="https://staarfoods.com/quote" style="color: darkgreen"
      >Get Quote</a
    >
  </div>
      <h5 style="font-weight: 300">
        CopyRights © 2024 Staar Exports & Imports® Pvt.Limited.
      </h5>
    </div>
  </div>
    `,
  };

  let successCount = 0;

  sendEmail(mailOptions2)
    .then(() => {
      successCount++;
      return sendEmail(mailOptions);
    })
    .then(() => {
      successCount++;
      checkSendCompletion();
    })
    .catch((error) => {
      console.error("Error in sending emails:", error);
    });

  function checkSendCompletion() {
    if (successCount === 2) {
      console.log("mail sent sucessful");
      res.json({ status: "Mail sent Successful" });
    } else {
      console.log("mail not sent ");
      res.json({ status: "Failed to send" });
    }
  }
});

//------------------------------------------Contact Form Mail-------------------------------------------
app.post("/postContact", (req, res) => {
  let user = req.body.User;
  console.log(req.body.User);

  //-----------------------------Mail Sent to Owner
  const mailOptions = {
    from: "Staar Exports And Imports",
    to: "staarfoods.com@gmail.com",
    subject: "Contact Details",
    html: `
    <div style="background: #f2f7f2; text-align: left; padding: 10px">
      <h2 style="font-family: Arial, Helvetica, sans-serif">
        <i> STAAR</i>

        <span style="font-size: 14px; color: rgb(214, 140, 3)"
          >Exports&Imports</span
        >
      </h2>
    </div>

    <div>
   

    <table cellpadding="0" cellspacing="0" border="0" width="400" bgcolor="#ffffff" style="border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);">
    <tr>
        <td style="padding: 20px;">
            <h2 style="color: #0a5a1f; text-align: center; border-bottom: 2px solid #0a5a1f; padding-bottom: 10px;">User Contact Details</h2>

            <table style="width: 100%;">
                <tr >
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Name:</strong>
                    </td>
                    <td>
                        ${user.firstName} ${user.lastName}
                    </td>
                </tr>
                <br/>
                <tr >
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Email:</strong>
                    </td>
                    <td>
                        ${user.email}
                    </td>
                </tr>
                <br/>
                <tr >
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Phone:</strong>
                    </td>
                    <td>
                        ${user.phoneNo}
                    </td>
                </tr>
                <br/>
                <tr>
                    <td style="text-align: left; padding-right: 10px;">
                        <strong style="color: #0a5a1f; display: inline-block; width: 100px;">Message:</strong>
                    </td>
                    <td>
                        ${user.msg}
                    </td>
                </tr>
            </table>

            <!-- Add more details as needed -->
        </td>
    </tr>
</table>
    </div>
    <div style="background: #f2f7f2; text-align: center; padding: 10px">
      <div style="text-align: center">
        <a
          href="mailto:office.staareximindialtd@gmail.com"
          style="color: darkgreen; margin-right: 20px"
          >Contact US</a
        >
        <a href="https://staarfoods.com/quote" style="color: darkgreen"
          >Get Quote</a
        >
      </div>
      <h5 style="font-weight: 300">
        CopyRights © 2024 Staar Exports & Imports® Pvt.Limited.
      </h5>
    </div>
    `,
  };

  //----------------------Mail sent to User
  const mailOptions2 = {
    from: "Staar Exports And Imports",
    to: user.email,
    subject: "Thanks For Contacting Us",
    html: `
    <div style="font-family: Helvetica, Arial, sans-serif">
    <div style="background: #f2f7f2; text-align: left; padding: 10px">
      <h2 style="font-family: Arial, Helvetica, sans-serif">
        <i> STAAR</i>

        <span style="font-size: 14px; color: rgb(214, 140, 3)"
          >Exports&Imports</span
        >
      </h2>
    </div>
    <div>
      <p style="font-size: larger">Hi, ${user.firstName} ${user.lastName}</p>
      <p style="color: rgb(63, 63, 63)">
        Thank you for reaching out to STAAR Exports&Imports! 🌍 Your inquiry is
        important to us, and we appreciate the opportunity to assist you with
        your export and import needs.<br /><br />

        Our team is dedicated to providing exceptional service, and we will get
        back to you as soon as possible. If you have any urgent inquiries, feel
        free to contact us directly at office.staareximindialtd@gmail.com<br /><br />

        In the meantime, explore our website to learn more about the
        comprehensive export and import solutions we offer. We look forward to
        the possibility of working together to facilitate seamless international
        trade.<br />
        <br />
        Best regards,
        <b><i> STAAR</i> Exports&Imports</b>
      </p>
    </div>
    <div style="background: #f2f7f2; text-align: center; padding: 10px">
    <div style="text-align: center">
    <a
      href="mailto:office.staareximindialtd@gmail.com"
      style="color: darkgreen; margin-right: 20px"
      >Contact US</a
    >
    <a href="https://staarfoods.com/quote" style="color: darkgreen"
      >Get Quote</a
    >
  </div>
      <h5 style="font-weight: 300">
        CopyRights © 2024 Staar Exports & Imports® Pvt.Limited.
      </h5>
    </div>
  </div>
    `,
  };

  let successCount = 0;

  sendEmail(mailOptions2)
    .then(() => {
      successCount++;
      return sendEmail(mailOptions);
    })
    .then(() => {
      successCount++;
      checkSendCompletion();
    })
    .catch((error) => {
      console.error("Error in sending emails:", error);
    });

  function checkSendCompletion() {
    if (successCount === 2) {
      console.log("mail sent sucessful");
      res.json({ status: "Mail sent Successful" });
    } else {
      console.log("mail not sent ");
      res.json({ status: "Failed to send" });
    }
  }
});

app.post("/portifolioEmail", async (req, res) => {
  const { email, name, website, message } = req.body;
  const mailOptions = {
    from: `${email}`,
    to: "nmvmanikanta@gmail.com",
    subject: `Recieved A Mail from ${name}`,
    html: `<p>${message}</p><p>Sender Website ${website}</p>`,
  };

  await sendEmail(mailOptions)
    .then((response) => {
      res
        .status(200)
        .json({ msg: "Email Sent Sucessfully and we will reach out to you" });
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
});

app.listen(PORT, () => console.log("server started "));
