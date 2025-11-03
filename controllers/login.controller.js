import { UserModel } from "../modules/user.module.js";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../utils/jwt.utils.js";
import { AppError, SuccessResponse } from "../utils/response.utils.js";


export default async function login(req, res, next) {
  try {

    const { email, password } = req.body;
    let searchResult = await UserModel.findOne({ email }).select("-audios").lean();

    if (!searchResult) {
      await bcrypt.compare(password, "$2b$10$randomstringtostoptimeattacking");
      throw new AppError(
        "Wrong Credentials",
        "VerificationError",
        "Login Fields",
        403
      ).JSON();
    }

    let isCorrectPassword = await bcrypt.compare(
      password,
      searchResult.password
    );

    if (!isCorrectPassword) {
      throw new AppError(
        "Wrong Credentials",
        "VerificationError",
        "Login Fields",
        403
      ).JSON();
    }

    let payload = {
      id: searchResult._id,
      role: searchResult.role,
    };
    let accessToken = tokenGenerator(payload, "10m");
    let refreshToken = tokenGenerator(payload, "7d");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "lax",
    });

    res.status(200).json(
      new SuccessResponse(true, "login success", {
        username: searchResult.username,
        role: searchResult.role,
        accessToken,
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
}

export { login };
