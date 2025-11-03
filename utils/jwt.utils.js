import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "./response.utils.js";

dotenv.config();

export default function tokenGenerator(Payload, exp="10m") {
  try {
    let Key = process.env.JWT_KEY;
    let token = jwt.sign(Payload, Key, { expiresIn: exp });
    return token;
  } catch (err) {
    //
    throw err;
  }
}

function tokenCheck(Token) {
  try {
    let Key = process.env.JWT_KEY;
    return jwt.verify(Token, Key);
  } catch (err) {
    throw new AppError(
      "Invalid or Expired Token ",
      "invalidToken",
      "token",
      403
    ).JSON();
  }
}

export { tokenCheck, tokenGenerator };
