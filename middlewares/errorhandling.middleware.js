import { errorLogger } from "../logger.js";

function GlobalErrorHandling(error, req, res, next) {
  
  if (error.isCustom) {
    delete error.isCustom
    res.status(error.status).json(error);
  } else {
    errorLogger.error(error.stack||error.message ||error );
    res.status(500).send({
      message: "Internal Server Error",
      code: "InternalError",
      field: "UNKNOWN",
      status: 500,
    });
  }
}
export default GlobalErrorHandling;
