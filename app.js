const express = require('express');
const path = require('path');
const cors = require('cors');
require("dotenv").config()

// Sécurity
const helmet = require('helmet');
const hpp = require("hpp");
const rateLimit = require("./middleware/limiter");

//Database
const db = require('./config/config');
//Test connexion DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();

app.use(cors({
    origin: process.env.URL_ORIGIN
}));

app.use(express.json());

app.use(helmet());
app.use(hpp());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/afc/auth', rateLimit.authLimiter, require('./routes/auth'));
app.use('/api/afc/account', require('./routes/accounts'));
app.use('/api/afc/customer', require('./routes/customers'));
app.use('/api/afc/employee', require('./routes/employees'));
app.use('/api/afc/preparation', require('./routes/preparations'));
app.use('/api/afc/step', require('./routes/steps'));
app.use('/api/afc/vehicle', require('./routes/vehicles'));
app.use('/api/afc/slot', require('./routes/slots'));
app.use('/api/afc/request', require('./routes/requests'));
app.use('/api/afc/preprequest', require('./routes/prepRequests'));
app.use('/api/afc/slotrequest', require('./routes/slotRequests'));
app.use('/api/afc/billings', require('./routes/billings'));

module.exports = app;