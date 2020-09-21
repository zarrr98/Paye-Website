const nodemailer = require("nodemailer");
const {email_password} = require("../utils/configs")
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user : "payegroup1@gmail.com",
    pass :email_password
  }
})



module.exports = transporter;