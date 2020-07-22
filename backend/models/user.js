const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
    // match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: { type: String, required: true, minlength: 6 },
  recipes: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: '',
      },
      recipeUrl: {
        type: String,
        default: '',
      },
      cuisines: {
        type: String,
        default: '',
      },
      sourceName: {
        type: String,
        default: '',
      },
      summary: {
        type: String,
        default: '',
      },
      preptime: {
        type: Number,
        default: '',
      },
      totalCookingTime: {
        type: Number,
        default: '',
      },
      ingredients: {
        type: String,
        default: '',
      },
      dishTypes: {
        type: String,
        default: '',
      },
      diets: {
        type: String,
        default: '',
      },
      instructions: {
        type: String,
        default: '',
      },
      winePairing: {
        type: String,
        default: '',
      },
      playlistRef: {
        type: String,
        default: 'crickets...',
      },
    },
  ],
  spotifyTokens: [
    {
      // this one gets returned
      access: {
        type: String,
        default: '',
      },
      // this one stays on the backend
      refresh: {
        type: String,
        default: '',
      },
    },
  ],
});

module.exports = mongoose.model('User', User);
