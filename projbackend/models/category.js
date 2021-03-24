// A simple schema it is. The category schema of the eproduct is defined here.
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    }
}, {timestamps: true}
)

module.exports = mongoose.model("Category", categorySchema)