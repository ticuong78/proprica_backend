class Errors {
  getError() {
    return this.errCode;
  }
}

class InternalServerError extends Errors {
  constructor() {
    super();
    this.errCode = 500;
  }
}

class UndefinedError extends Errors {
  constructor() {
    super();
    this.errCode = 404;
  }
}

class ErrorCompany {
  returnError(error) {
    const errName = error.name; //errName thì chỉ có một,
    const errMsg = error.message; //erMsg thì phải includes
    if (errName === "TimeoutError") return new InternalServerError().getError(); //timeouterror: lỗi timeout puppeteer không tìm thấy class
    if (errName === "ProtocolError" || errMsg.includes("ERR_ABORTED") || errMsg.includes("ERR_TOO_MANY_REDIRECTS") || errName === "TargetCloseError") return new UndefinedError().getError(); //protocol: lỗi link, err_aborted: request timeout
  }
}

module.exports = ErrorCompany;