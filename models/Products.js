const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
         required: true,
    },
   
    category: {
        type: String,
      required: true,
    },
    description: {
        type: String,
          required: true,
    },
    price: {
        type: String,
         required: true,
    },
    rentprice:{
        type: String,
         required: true,
    },
    rentType:{
        type: String,
         required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);