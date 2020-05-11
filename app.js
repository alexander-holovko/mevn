let express = require('express');
let session = require('express-session');
let cors = require('cors')
let createError = require('http-errors');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let FileStore = require('session-file-store')(session);

let room = require('./routes/room');
let chat = require('./routes/chat');
let user = require('./routes/user');
let auth = require('./routes/auth');
let app = express();

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/mevn-chat', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(cors({
  origin:['http://localhost:8080'],//frontend server localhost:8080
  methods:['GET','POST','PUT','DELETE'],
  credentials: true // enable set cookie
}))

app.use(session({
  secret: 'JollynakAjollynakAjollynakApamPam',
  resave: false,
  store: new FileStore,
  saveUninitialized: false,
  name: 'test'
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/rooms', express.static(path.join(__dirname, 'dist')));
app.use('/api/room', room);
app.use('/api/chat', chat);
app.use('/api/user', user);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-   Type, Accept, Authorization");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
