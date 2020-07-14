const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "cant be blank"],
    // match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  // recipes: [
  //   {
  //   name: {
  //     type: String,
  //     // required: true,
  //   },
  //   playlistRef: {
  //     type: String,
  //     default: "crickets..."
  //   }
  // }
  // ]
})


const User = mongoose.model("User", UserSchema)
module.exports = User;