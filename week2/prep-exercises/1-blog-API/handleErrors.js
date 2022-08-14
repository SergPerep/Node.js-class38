// Custom error handler middleware
import { BadRequestError } from "./appErrors.js";

const handleErrors = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    console.error("\x1b[31m%s\x1b[0m", `~~ ${err.name}: ${err.message}`); // for developer
    res.status(err.statusCode).send({ error: err.message }); // for user
  }
  if (err.statusCode === 500) {
    console.error(err); // for developer
    res.status(err.statusCode).json({ error: err.message }); // for user
  }
};

export default handleErrors;