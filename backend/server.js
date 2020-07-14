const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes.js');

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb+srv://yeddy:denver@cluster0.gvtay.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true
})

app.use(userRouter);

app.listen(3000, () => { console.log('Server is running...') });