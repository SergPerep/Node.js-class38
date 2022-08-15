const logColor = "\x1b[31m%s\x1b[0m";
const logError = (message) => console.error(logColor, "~~ " + message);

const handleErrors = (err, req, res, next) => {
  if (err.statusCode === 404) {
    // for developer
    logError(err.message);
    // for user
    res.status(err.statusCode).send({ error: err.message })
  }
  if (err.statusCode === 500) {
    // for developer
    logError(err)
    // for user
    res.status(err.statusCode).send({ error: err.message });
  }
};

export default handleErrors;