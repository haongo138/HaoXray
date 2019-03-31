
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const dotenv = require('dotenv');

//setup environment
dotenv.config();

//create Express app
const app = express();

//config view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); //for parsing  application/json
app.use(bodyParser.urlencoded({ extend: true})); //for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req,res) => res.render('index', {
  username: 'toxicFumo'
}));

app.use('/users', userRoute);
app.use('/auth', authRoute); 

const PORT = process.env.PORT || 5000;

//run server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
