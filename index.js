const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// routes 
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const indexRoute = require('./routes/index.route');
const productRoute = require('./routes/products.route');
const cartRoute = require('./routes/cart.route.js');

// middlewares
const sessionMiddleware = require('./middlewares/session.middleware');
// setup environment
dotenv.config();

// create Express app
const app = express();

// config view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); //for parsing  application/json
app.use(bodyParser.urlencoded({ extend: true})); //for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

// setup routes
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute); 
app.use('/products', productRoute);
app.use('/cart', cartRoute);

// assign run port
const PORT = process.env.PORT || 5000;

// run server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
