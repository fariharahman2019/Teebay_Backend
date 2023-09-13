const { ObjectId } = require('mongodb');
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

exports.productDetails = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      message: "Doctor is not Found !!"
    });
  }
  res.status(200).json({
    success: true,
    product,

  });
};

exports.myProduct = async (req, res, next) => {
  const product = await productModel.find({ user: req.user._id }).sort({createdAt:-1});
  res.status(200).json({
    success: true,
    product,

  });
};

exports.getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({ success: true, products });
};