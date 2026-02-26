import { APIError } from "./error-handler.js";

export const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    next(new APIError("API version not supported", 404));
  }
};

export const headerVersioning = (version) => (req, res, next) => {
  const reqVersion = req.headers["Accept-Version"];
  if (reqVersion === version) {
    next();
  } else {
    next(new APIError("API version not supported", 404));
  }
};

export const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.headers["Content-Type"];
  if (contentType && contentType === `application/vnd.api.${version}+json`) {
    next();
  } else {
    next(new APIError("API version not supported", 404));
  }
};