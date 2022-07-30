const mongoose = require('mongoose');
const validator = require('validator');
const Users = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      match: [RegExp(/[a-zA-Z0-9]$/), 'Name only contain a-z and 1-9'],
   },
   age: { type: Number, required: true, min: 18, max: 65 },
   address: { type: String, required: true },
   gender: { type: String, required: true },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
         validator: validator.isEmail,
         message: '{VALUE} is not a valid email',
      },
   },
   password: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Users', Users);
