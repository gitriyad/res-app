let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  published: {
    type: Number,
    default: 0,
  },
  incomplete: {
    type: Number,
    default: 0,
  },
  pending: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "Active",
  },
});
module.exports = mongoose.model("User", userSchema);
