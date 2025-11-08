module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
