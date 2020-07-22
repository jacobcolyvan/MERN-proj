const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true
    // match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: { type: String, required: true, minlength: 6 },
  recipes: [
    {
      name: {
        type: String,
        required: true
      },
      playlistRef: {
        type: String,
        default: 'crickets...'
      }
    }
  ],
  spotifyTokens: [
    {
      // this one gets returned
      access: {
        type: String,
        default: ''
      },
      // this one stays on the backend
      refresh: {
        type: String,
        default: ''
      }
    }
  ]
  //spotify tokens
});

module.exports = mongoose.model('User', User);
