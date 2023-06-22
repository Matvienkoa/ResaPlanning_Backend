const express = require('express');
const path = require('path');
const cors = require('cors');
require("dotenv").config()

//Sécurity
// const helmet = require('helmet');
// const hpp = require("hpp");
// const rateLimit = require("./middleware/limiter");

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

// app.use(helmet());
// app.use(hpp());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/afc/auth', require('./routes/auth'));
app.use('/api/afc/account', require('./routes/accounts'));
app.use('/api/afc/customer', require('./routes/customers'));
app.use('/api/afc/employee', require('./routes/employees'));

// app.use('/api/spdev/product', require('./routes/products'));
// app.use('/api/spdev/category', require('./routes/categories'));
// app.use('/api/spdev/stock', require('./routes/stocks'));
// app.use('/api/spdev/warehouse', require('./routes/warehouses'));
// app.use('/api/spdev/store', require('./routes/stores'));
// app.use('/api/spdev/order', require('./routes/orders'));
// app.use('/api/spdev/orderdetails', require('./routes/orderDetails'));
// app.use('/api/spdev/sale', require('./routes/sales'));
// app.use('/api/spdev/permission', require('./routes/permissions'));

module.exports = app;