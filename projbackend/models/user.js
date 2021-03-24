// Declaration for accessing the mongoose, crypto etc.
const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require("uuid/v1");

// Declartion and definition of schemas
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 24,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userInfo: {
    type: String,
    trim: true,
  },
  encryPassword: {
    type: String,
    required: true,
  },
  // What is salt? Google it.
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
});

//Virtuals are document property that you can get and set what get don't get persist to MongoDB
userSchema.virtual("password")
  .set(function (password) {
    // assigns the password into a variable "this.password" but '_' is used to declare the variable privately therefore "this._password" is used
    this._password = password;
    this.salt = uuidv1();
    this.encryPassword = this.securePassword(password);  
  })
  .get(function () {
    return this._password;
  })

// All functions are in a single userSchema
userSchema.methods = {

  // Password aunthetication
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encryPassword;
  }, 

  // Here somebody is putting plain password like "Sanu@baya3ni" and we are going to return the encrypted password like ****** 
  securePassword: function(plainpassword) {
    // If the user put a false password like not a string(bz it is mentioned above that password should be a string in userSchema) then we are going to return nothing.
    if (!plainpassword) return "";
    try {
      return crypto
      // These are the syntax of the crypto copied from documentation of crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

// exports the code to MongoDB
module.exports = mongoose.model("User", userSchema);
