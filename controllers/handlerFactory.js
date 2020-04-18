const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(404).json({
      status: 'success',
      data: null
    });
  });

const updateOne = (module.exports = {
  deleteOne
});
