const userModel = require('../models/User');
const sendToken = require('../utilies/jwtToken');
const ErrorHandler = require("../utilies/ErrorHandler");

exports.createUser = async (req, res, next) => {
    try {
        const { firstname,lastname,address,email,phone,password,confirmpassword } = req.body;
        const findUser = await userModel.findOne({ email: email });
        if (findUser) {
            return next(new ErrorHandler("User already exists", 400));
        }
        if(password === confirmpassword){
            const user = await userModel.create({
                firstname,lastname,address,email,phone,password ,confirmpassword
            });
            sendToken(user, 201, res);
        }else{
            return next(new ErrorHandler("Both Password Does Not Matched ", 400));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

exports.loginUser = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("User doesn't exists!", 400));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(
                new ErrorHandler("Email & password does not matched", 400)
            );
        }
        if (isPasswordMatched) {
            sendToken(user, 200, res);
        }
    }catch(error){
        return next(new ErrorHandler(error.message, 400));
    }
};