const { ObjectId } = require('mongodb');
const rentModel = require('../models/Rent');

exports.newRent = async (req, res, next) => {
    const {
        title, category, description, price, rentprice, rentType,from,to

    } = req.body;

    const rent = await rentModel.create({
        title, category, description, price, rentprice, rentType,from,to,
         user: req.user._id,
    });
    res.status(201).json({
        success: true,
        rent,
    });
};

exports.myRentProduct = async (req, res, next) => {
    const product = await rentModel.find({ user: req.user._id }).sort({createdAt:-1});
    res.status(200).json({
      success: true,
      product,
  
    });
  };