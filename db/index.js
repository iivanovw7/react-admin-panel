const mongoose = require("mongoose");

//model for website users
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  vk_id: {type: Number, required: false},
  email: {type: String, required: false},
  password: {type: String, required: false},
  name: {type: String, required: true},
  superuser: {type: Boolean, required: true}
});


const user = mongoose.model('User', userSchema, 'users');

module.exports = {
  user: user
};