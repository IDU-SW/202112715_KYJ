const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const bookrouter  = require('./router/bookRouter');
//const loginrouter  = require('./routers/loginRouter');
app.use('/',bookrouter);
//app.use('/login',loginrouter);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

const methodOverride  = require('method-override');
app.use(methodOverride('_method'));


module.exports = app;
