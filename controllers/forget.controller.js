import { errorLogger } from "../logger.js";
import { UserModel } from "../modules/user.module.js";
import { tokenCheck } from "../utils/jwt.utils.js";
import { AppError, SuccessResponse } from "../utils/response.utils.js";
import { sendForgetPasswordEmail } from "../utils/sendEmail.utils.js";
import bcrypt from "bcrypt";
export async function forgotPassword(req, res, next) {
  try {
    res.status(200).json(
      new SuccessResponse(true, "password updated successfully", {
        nextRoute: "/login",
        message: "Now you can log in with your new password",
      }).JSON()
    );

    let email = req.params?.email;
    const user = await UserModel.findOne({ email });

    if (!user) return;
    if (user.resetPassword?.expiredIn > Date.now()) return;
    //not work
    user.resetPassword = {
      expiredIn: Date.now() + 5 * 60 * 1000,
      token: await sendForgetPasswordEmail(user.email, user._id),
    };
    await user.save();
  } catch (error) {
    errorLogger.error(error);
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const payload = tokenCheck(token);
    const user = await UserModel.findById(payload.id);
    if (!user)
      throw new AppError("User Not Found", "faild", "token", 401).JSON();

    if (user.resetPassword?.token !== token)
      throw new AppError(
        "Invalid or Expired Token",
        "invalidToken",
        "token",
        401
      ).JSON();

    user.resetPassword = {
      expiredIn: null,
      token: null,
    };
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res
      .status(200)
      .json(new SuccessResponse(true, "password updated successfully", {}));
  } catch (error) {
    next(error);
  }
};
