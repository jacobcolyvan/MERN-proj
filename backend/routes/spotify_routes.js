const express = require('express');
const router = express.Router();
const request = require('request');
const axios = require('axios');
const auth = require('../middleware/auth');
const userModel = require('../models/user');
let querystring = require('querystring');
// let SpotifyWebApi = require('spotify-web-api-node');

// let redirect_uri = 'http://localhost:3001/spotify/callback';
let redirect_uri = 'http://localhost:3001/spotify-loading';

// let spotifyApi = new SpotifyWebApi(credentials);

router.get('/spotify/login', (req, res) => {
  try {
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID2,
          scope: 'user-read-private user-read-email',
          redirect_uri
        })
    );
  } catch {
    res.status(500).send(err);
    console.log('Error with request ');
  }
});

router.post('/spotify/callback', auth, (req, res) => {
  let code = req.body.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID2 +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')
    },
    json: true
  };

  request.post(authOptions, async function (error, response, body) {
    console.log('–––');
    console.log(body);
    console.log(req.body.id);

    const user = await userModel.findById(req.body.id);
    let spotifyTokens = {
      access: body.access_token,
      refresh: body.refresh_token
    };
    await user.update({ spotifyTokens: spotifyTokens });
    console.log('tokens added to user');
  });
});

module.exports = router;
