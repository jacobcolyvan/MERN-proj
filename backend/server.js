const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user_routes.js');
const spotifyRouter = require('./routes/spotify_routes.js');
const cors = require('cors');

require('dotenv').config({path: './.env'})
console.log(process.env.SPOTIFY_CLIENT_ID);

const app = express();
app.use(express.json()); //init middleware
app.use(cors());

mongoose.connect(
  'mongodb+srv://yeddy:denver@cluster0.gvtay.mongodb.net/<dbname>?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   console.log(res);
//   console.log("cors");
//   next();
// });

app.use(userRouter);
app.use(spotifyRouter);

app.listen(3000, () => {
  console.log('Server is running...');
});

//Defining route for auth
app.use('/auth', require('./routes/auth'));


