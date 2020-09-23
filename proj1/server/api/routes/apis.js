const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Strings = require("../../utils/strings");
const checkAuth = require("../middleware/check-auth");
const confirmEmailToken = require("../middleware/confirm-email");
const transporter = require("../../email/send");
const sendEmail = require("../../email/templates");
const { upload } = require("../middleware/upload-file");
const { JWT_KEY } = require("../../utils/configs");
const { SERVER_URL } = require("../../utils/configs");

// const {SMS_API_KEY} = require("../../utils/configs")

// var Kavenegar = require('kavenegar');
// var smsApi = Kavenegar.KavenegarApi({
//     apikey: SMS_API_KEY
// });

//signup
router.put("/signup", (req, res, next) => {
  console.log("in signup, req: ", req.body);
  User.findOne({ email: req.body.email })
    .exec()
    .then((existedUser) => {
      // We have a new user!
      if (!existedUser) {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            console.log("error in bcrypt - signup");
            return res.status(500).json({
              error,
              status: 500,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              familyName: req.body.familyName,
              password: hash,
              email: req.body.email,
            });

            user
              .save()
              .then((saveUserResolve) => {
                console.log("user was saved!");
                const confirmationToken = jwt.sign(
                  {
                    email: user.email,
                    userId: user._id,
                    name: user.name,
                    familyName: user.familyName,
                  },
                  JWT_KEY,
                  {
                    expiresIn: "10 min",
                  }
                );
                console.log("jwt was built : ", confirmationToken);
                transporter
                  .sendMail(
                    sendEmail(
                      req.body.email,
                      Strings.email.confirmationTitle,
                      confirmationToken
                    )
                  )
                  .then((resolve) => {
                    return res.status(200).json({
                      message: "sent email successfully",
                      status: 200,
                      answer: {
                        resolve,
                        user: user,
                      },
                    });
                  })
                  .catch((err) => {
                    console.log("error in send email");
                    return res.status(500).json({
                      error: err,
                      status: 500,
                    });
                  });

                // });
              })
              .catch((err) => {
                console.log("here");
                return res.status(500).json({
                  error: err,
                  status: 500,
                });
              });
          }
        });
      }

      // We have already seen this email address.
      else if (existedUser) {
        return res
          .status(409)
          .json({ message: "user already existed", status: 409 });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        status: 500,
      });
    });
});

//click confirmation link
router.get("/confirmation/:token", confirmEmailToken, (req, res, next) => {
  console.log("req.decodedJWT in handle confirmation => ", req.decodedJWT);

  let query = { _id: req.decodedJWT.userId };
  let update = {
    $set: { confirmed: true },
  };

  User.update(query, update)
    .exec()
    .then((resolve) => {
      console.log("got updated successfully");
      res.redirect(
        `${SERVER_URL.protocol}://${SERVER_URL.baseURL}:${SERVER_URL.port}/login`
      );
      // res.redirect("http://localhost:3000/login");
    })
    .catch((err) => {
      console.log("error here");
      return res.status(500).json({ error: err, status: 500 });
    });
});

//login
router.get("/login/:email/:pass", (req, res, next) => {
  //console.log(new persianDate().format())
  let email = req.params.email;
  User.findOne({
    email: email,
  })
    .exec()
    .then((resolve) => {
      //if user's found
      if (resolve) {
        //check the password
        bcrypt.compare(req.params.pass, resolve._doc.password, (err, same) => {
          if (err) {
            console.log("error in bcrypt");
            return res
              .status(403)
              .json({ message: "Auth failed", status: 403 });
          }
          //if password was wrong
          if (!same) {
            return res
              .status(403)
              .json({ message: "Auth failed", status: 403 });
          } else {
            //if password is correct

            //check if the user is confirmed
            if (resolve._doc.confirmed) {
              const token = jwt.sign(
                {
                  email: resolve._doc.email,
                  userId: resolve._doc._id,
                  name: resolve._doc.name,
                  familyName: resolve._doc.familyName,
                },
                JWT_KEY,
                {
                  expiresIn: "30d",
                }
              );
              return res.status(200).json({
                resolve: {
                  _id: resolve._doc._id,
                  name: resolve._doc.name,
                  familyName: resolve._doc.familyName,
                  email: resolve._doc.email,
                  token,
                },
                status: 200,
              });
            } else {
              //if user is not confirmed, send the email
              const confirmationToken = jwt.sign(
                {
                  email: resolve._doc.email,
                  userId: resolve._doc._id,
                  name: resolve._doc.name,
                  familyName: resolve._doc.familyName,
                },
                JWT_KEY,
                {
                  expiresIn: "10 min",
                }
              );
              transporter
                .sendMail(
                  sendEmail(
                    email,
                    Strings.email.confirmationTitle,
                    confirmationToken
                  )
                )
                .then((resolve1) => {
                  return res.status(201).json({
                    message: "sent email successfully",
                    status: 201,
                    resolve: resolve._doc,
                  });
                })
                .catch((err) => {
                  console.log("error in send email");
                  return res.status(500).json({
                    error: err,
                    status: 500,
                  });
                });
            }
          }
        });
      } else {
        console.log("user not found");
        return res.status(403).json({ message: "Auth failed", status: 403 });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err, status: 500 });
    });
});

module.exports = router;
