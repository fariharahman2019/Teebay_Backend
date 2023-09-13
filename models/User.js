const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		 required: true,
	},
	lastname: {
		type: String,
		 required: true,
	},
	address: {
		type: String,
		 required: true,
	},
	email: {
		type: String,
		 required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	confirmpassword: {
		type: String,
		required: true,
		select: false,
	},
	role: {
		type: String,
		default: "user",
	},
	phone: {
		type: String,
	},

	avatar: {
		public_id: {
		  type: String,
		//   required: true,
		},
		url: {
		  type: String,
		//   required: true,
		},
	  },
	createdAt: {
		type: Date,
		default: Date.now,
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});
// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("confirmpassword")) {
// 		next();
// 	}
// 	this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
// });
// // JWT TOKEN
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};
// // Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
	return resetToken;
};

module.exports = mongoose.model("User", userSchema);
