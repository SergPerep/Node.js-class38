import { MissingCredError, NotFoundError } from "./AppErrors.js";

const logColor = "\x1b[31m%s\x1b[0m";
const logError = (message) => console.error(logColor, "~~ " + message);

const handleErrors = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    logError(err.message);
    return res.status(err.statusCode).send({ weatherText: err.message });
  }
  if (err.statusCode === 404 || err instanceof MissingCredError) {
    // for developer
    logError(err.message);
    // for user
    return res.status(err.statusCode).send({ error: err.message });
  }
  if (err.statusCode === 500) {
    // for developer
    logError(err);
    // for user
    return res.status(err.statusCode).send({ error: err.message });
  }
  next();
};

export default handleErrors;
