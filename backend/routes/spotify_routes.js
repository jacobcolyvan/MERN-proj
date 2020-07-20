// const express = require('express');
// const router2 = express.Router();
// let request = require('request');
// require('dotenv').config();

// let querystring = require('querystring');
// let SpotifyWebApi = require('spotify-web-api-node');

// let redirect_uri = 'http://localhost:3000/spotify/callback';

// let spotifyApi = new SpotifyWebApi(credentials);

// router2.get('/spotify/login', (req, res) => {
//   try {
//     res.redirect(
//       'https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//           response_type: 'code',
//           client_id: process.env.SPOTIFY_CLIENT_ID2,
//           scope: 'user-read-private user-read-email',
//           redirect_uri
//         })
//     );
//   } catch {
//     res.status(500).send(err);
//     console.log('Error with request ');
//   }
// });

// // https://accounts.spotify.com/authorize?response_type=code&client_id=88341562f37b4a32a4ebf5a2e7bbe9e4&scope=user-read-private%20user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fspotify%2Fcallback

// // https://accounts.spotify.com/en/login?continue=https:%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Duser-read-private%2Buser-read-email%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8888%252Fcallback%26client_id%3D613a9b0f2f88482e861cfaf59533a685

// router2.get('/spotify/callback', (req, res) => {
//   let code = req.query.code || null;
//   let authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       Authorization:
//         'Basic ' +
//         new Buffer(
//           process.env.SPOTIFY_CLIENT_ID2 +
//             ':' +
//             process.env.SPOTIFY_CLIENT_SECRET
//         ).toString('base64')
//     },
//     json: true
//   };

//   request.post(authOptions, function (error, response, body) {
//     var access_token = body.access_token;
//     let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
//     console.log(body);
//     console.log(access_token);
//     // initialiseSpotify(access_token)
//     res.redirect(uri);
//   });
// });

// module.exports = router2;
