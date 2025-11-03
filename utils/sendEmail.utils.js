import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import { errorLogger } from "../logger.js";
import { tokenGenerator } from "./jwt.utils.js";
import { AppError } from "./response.utils.js";
dotenv.config();

export async function sendEmail(SendTo, subject, message) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: SendTo,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    errorLogger.error(error);
    throw new AppError(
      "Failed to send email, please try again later",
      "InternlError",
      "unknown",
      500
    );
  }
}

 export default async function sendVerificationEmail(email) {
  const token = tokenGenerator({ email }, "10m");

  const verificationLink = `${process.env.CLIENT_URL}/verify/${token}`;
  const message = `Click the link below to activate your account:\n${verificationLink}`;

   await sendEmail(email, "Verification Email", message);
   return token ;
}

   async function sendForgetPasswordEmail(email , id) {
  const token = tokenGenerator({ id }, "10m");
  
  const resetUrl = `${process.env.CLIENT_URL}/resetPassword/${token}`;
  const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;
  
  await sendEmail(email, "Verification Email", message);
  return token ;
}


export { sendVerificationEmail , sendForgetPasswordEmail };
