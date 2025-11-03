class Response {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
  JSON() {
    return {
      isCustom: true,
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}
class SuccessResponse extends Response {
  constructor(success, message, data) {
    super(success, message, data);
  }
}

class AppError extends Response {
  constructor(
    message = "Internal Server Error",
    code = "InternalError",
    field = "UNKNOWN",
    status = 500
  ) {
    super(false, message);
    this.field = field;
    this.code = code;
    this.status = status;
  }
  JSON() {
    return {
      isCustom: true,

      success: this.success,
      message: this.message,
      field: this.field,
      status: this.status,
    };
  }
}

export { AppError, SuccessResponse };
