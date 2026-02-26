export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  req.requestTime = timestamp;
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};
