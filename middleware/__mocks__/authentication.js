module.exports = jest.fn().mockImplementation((req, res, next) => {
  next();
});
