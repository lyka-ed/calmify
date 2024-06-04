export function AppResponse(res, statusCode = 200, data = null, message = "") {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
}
