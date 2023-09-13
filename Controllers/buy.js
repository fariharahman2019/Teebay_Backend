const { ObjectId } = require('mongodb');
const buyModel = require('../models/Buy');
exports.newBuy = async (req, res, next) => {
    const {
        title, category, description, price, rentprice, rentType

    } = req.body;

    const buy = await buyModel.create({
        title, category, description, price, rentprice, rentType,
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        buy,
    });
};