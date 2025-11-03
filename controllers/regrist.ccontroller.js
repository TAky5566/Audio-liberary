import { UserModel } from "../modules/user.module.js";
import bcrypt from "bcrypt";
import { AppError, SuccessResponse } from "../utils/response.utils.js";
import { sendVerificationEmail } from "../utils/sendEmail.utils.js";
export default async function regrist(req, res, next) {
  try {
    const { email, password, username } = req.body;

    let isExsist = await UserModel.findOne({ email }).lean();
    if (isExsist) {
      throw new AppError(
        "Email is Already in Use",
        "EmailReuse",
        "email",
        403
      ).JSON();
    }

    let HashedPassword = await bcrypt.hash(password, 10);

    let user = await UserModel.create({
      email,
      password: HashedPassword,
      username,
      createdAt: Date.now(),
    });

    user.VerifyState.VerifyToken = await sendVerificationEmail(email);
    user.VerifyState.isSent = true;
    user.VerifyState.lastSend = Date.now() + 5 * 60 * 1000;

    await user.save();

    res.status(200).json(
      new SuccessResponse(true, "regrist success and email verification sent", {
        nextRoute: "/auth/resend",
      }).JSON()
    );
  } catch (err) {
    next(err);
  }
}
export { regrist };
