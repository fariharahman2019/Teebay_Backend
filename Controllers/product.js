const productModel = require('../models/Products');
const ErrorHandler = require("../utilies/ErrorHandler");

exports.createProduct = async (req, res, next) => {
  try {
    const {  title, category, description, price, rentprice, rentType} = req.body;
    const findProduct = await productModel.findOne({ title: title });
    if (findProduct) {
      return next(new ErrorHandler("This Product already exists", 400));
    }
    const products = await productModel.create({
      title, category, description, price, rentprice, rentType,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
