export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || err.status || 500;

  const response = {
    success: false,
    message: err.message || "Something went wrong",
  };

  if (err.details) {
    response.details = err.details;
  }

  res.status(statusCode).json(response);
};
