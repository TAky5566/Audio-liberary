import { UserModel } from "../modules/user.module.js";
import { tokenCheck } from "../utils/jwt.utils.js";
import { AppError , SuccessResponse} from "../utils/response.utils.js";

export default async function verify(req, res, next) {
  try {
    let token = req.params.token;
    let data = tokenCheck(token);

    let user = await UserModel.findOne({ email: data.email }).select(
      "VerifyState"
    );
    if (!user) {
      throw new AppError(
        "Invalid or Expired Token",
        "TokenVerify",
        "Token",
        401
      ).JSON();
    }
    if (user.VerifyState.isVerified) {
      return res.status(200).json(
        new SuccessResponse(true, "account is already verified", {
          resendRoute: "/login",
        }).JSON()
      );
    }
    if (user.VerifyState.VerifyToken === token) {
      user.VerifyState.isVerified = true;
      await user.save();

      res.status(200).json(
        new SuccessResponse(true, "verification success", {
          nextRoute: "/login",
        }).JSON()
      );
    } else {
      throw new AppError(
        "Invalid or Expired Token",
        "TokenVerify",
        "Token",
        401
      ).JSON();
    }
  } catch (e) {
    next(e);
  }
}

export { verify };
