export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

export const addTimestamp = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};
