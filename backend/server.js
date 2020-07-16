const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user_routes.js');
const cors = require('cors')

const app = express();
app.use(express.json()); 
app.use(cors())

mongoose.connect('mongodb+srv://yeddy:denver@cluster0.gvtay.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   console.log(res);
//   console.log("cors");
//   next();
// });

app.use(userRouter);

app.listen(3000, () => { console.log('Server is running...') });