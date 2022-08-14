// Custom error handler middleware
import { BadRequestError } from "./appErrors.js";

const handleErrors = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    console.error(`${err.name}: ${err.message}`); // for developer
    res.status(err.statusCode).send({ error: err.message }); // for user
  }
  if (err.statusCode === 500) {
    console.error(err); // for developer
    res.status(err.statusCode).json({ error: err.message }); // for user
  }
};

export default handleErrors;