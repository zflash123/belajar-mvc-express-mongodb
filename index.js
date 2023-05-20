const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

dotenv.config();
// Mongo DB Connection 
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('connection success'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');

//BodyParsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/', require('./routes/login'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log('Server has started at: http://localhost:' + PORT));

