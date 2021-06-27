/**
 * Helper function
 * @param {*} statusCode
 * @param {*} message
 * @returns
 */
const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    error: message || "An Error occurred.",
  }),
});

/**
 *
 * @param {*} error Error message
 */
const errorResponse = (error) => {
  console.log(error);
  if (error.message) {
    return createErrorResponse(400, error.message);
  }
  return createErrorResponse(error.statusCode || 500, error.message);
};

module.exports = {
  createErrorResponse,
  errorResponse,
};
