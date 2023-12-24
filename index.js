// const express = require("express");
// const nodemailer = require("nodemailer");
// var smtpTransport = require("nodemailer-smtp-transport");
// var bodyParser = require("body-parser");
// const app = express();
// const cors = require("cors");
// // app.use(express.json(true));
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// app.post("/postMail", async (req, res) => {
//   // let user = req.body;
//   let user = {
//     Items: [
//       {
//         productImg:
//           "https://5.imimg.com/data5/KM/BJ/MY-13701092/sona-masoori-rice.jpg",
//         productName: "Sona Masoori Rice ",
//         quantity: 6,
//       },
//       {
//         productImg:
//           "https://rukminim2.flixcart.com/image/850/1000/xif0q/rice/e/f/t/10-idli-white-raw-pouch-raw-rice-nupsila-medium-grain-original-imagr86kdmjxhm8z.jpeg?q=20",
//         productName: "Idly Rice",
//         quantity: 5,
//       },
//       {
//         productImg:
//           "https://cdn.dotpe.in/longtail/store-items/5739802/IVRfVrqX.jpeg",
//         productName: "Ragi Flour",
//         quantity: 5,
//       },
//     ],
//     User: {
//       firstName: "Durga ",
//       lastName: "Prasad",
//       email: "prasaddurga2031@gmail.com",
//       phoneNo: "+919177943677",
//       address: "1-42, Velamapeta, Pasalapudi",
//     },
//   };
//   console.log(req.body);
//   const transporter = nodemailer.createTransport(
//     smtpTransport({
//       service: "Gmail",
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "saidurga4c3@gmail.com",
//         pass: "ukjb odgx mjsa kuyy",
//       },
//     })
//   );

//   const mailOptions = {
//     from: "Sai@1234567",
//     to: "prasaddurga2031@gmail.com",
//     subject: "Order Details",
//     html: `
//     <div
//     style="
//       font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
//         sans-serif;

//   >
//     <h2 style="text-decoration: underline 2px orange;">Cart Details</h2>
//     <div>
//       <h4><b>User Name :</b>${user.User.firstName}  ${user.User.lastName}</h4>
//       <h4><b>Mobile No :</b> ${user.User.phoneNo}</h4>
//       <h4><b>Email :</b> ${user.User.email}</h4>
//       <address><b>Address :</b> ${user.User.address}</address>
//       <br />
//       <table
//         style="
//           border-collapse: collapse;
//           width: 100%;
//           background: rgb(235, 234, 234);
//         "
//       >
//         <thead style="background: black; color: white; height: 50px">
//           <tr style="border-bottom: 1px solid #ddd">
//             <td style="padding: 10px"><b>Image</b></td>
//             <td style="padding: 10px"><b>Product_Name</b></td>
//             <td style="padding: 10px"><b>Quantity</b></td>
//           </tr>
//         </thead>
//         <tbody>
//         ${user.Items.map((data) => {
//           return ` <tr style="border-bottom: 1px solid #bdbcbc">
//             <td style="padding: 10px">
//               <img
//                 src="${data.productImg}"
//                 style="
//                   width: 100px;
//                   height: 100px;
//                   object-fit: cover;
//                   border-radius: 5px;
//                 "
//                 alt="Image"
//               />
//             </td>
//             <td style="padding: 10px">${data.productName}</td>
//             <td style="padding: 10px">${data.quantity}kgs</td>
//           </tr>`;
//         }).join("")}
//         </tbody>
//       </table>
//     </div>
//   </div>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       res.json({ status: "Failed to send" });
//       console.log("Error sending email:", error);
//     } else {
//       res.json({ status: "Mail sent Successful" });
//       console.log("Email sent:", info.response);
//     }
//   });
// });

// app.listen(2000, () => console.log("server started "));
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

app.post("/postMail", async (req, res) => {
  let user = req.body;

  console.log(req.body);
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "staarfoods.com@gmail.com",
        // pass: "ukjb odgx mjsa kuy",
        pass:"yezp fkzm wgvv fulq",
      },
    })
  );

  const mailOptions = {
    from: "StaarFoods",
    to: "staarfoods.com@gmail.com",
    subject: "Order Details",
    html: `
    <div
    style="
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    
  >
    <h2 style="text-decoration: underline 2px orange;">Cart Details</h2>
    <div>
      <h4><b>User Name :</b>${user.User.firstName}  ${user.User.lastName}</h4>
      <h4><b>Mobile No :</b> ${user.User.phoneNo}</h4>
      <h4><b>Email :</b> ${user.User.email}</h4>
      <address><b>Address :</b> ${user.User.address}</address>
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
    </div>
  </div>
    `,
  };

  const mailOptions2 = {
    from: "admin@staarfoods",
    to: user.User.email,
    subject: "Order Details",
    html: `
    <div
    style="
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
    
  >
    <h2 style="text-decoration: underline 2px orange;">Your Order Items</h2>
    <div>

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
        <br />
         <h4>Thank you, for your order soon our staff will contact you with your order.</h4>
    
    
    </div>
  </div>
    `,
  };
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
      // Handle the error or send a failure response here
    });

  function checkSendCompletion() {
    // Check if both emails have been sent (successCount is 2)
    if (successCount === 2) {
      console.log("mail sent sucessful");
      res.json({ status: "Mail sent Successful" });

      // Here you can send the response 'true' or perform any other action
    } else {
      console.log("mail not sent ");
      res.json({ status: "Failed to send" });
    }
  }
});

app.listen(PORT, () => console.log("server started "));
