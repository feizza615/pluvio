const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connected to database');
});

const usersRouter = require('./routes/users')
app.use('/users',usersRouter);

app.listen(port, () => {
    console.log(`Server on port: ${port}`)
})
