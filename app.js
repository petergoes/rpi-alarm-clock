const createError = require('http-errors');
const express = require('express');
const app = express()
const path = require('path');
const cookieParser = require('cookie-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const normalizePort = require('./utils/normalize-port')
const alarmClock = require('./alarmclock/alarmclock')

server.listen(normalizePort(process.env.PORT || 3000));

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

io.on('connection', function (socket) {
  const emitTime = time => socket.emit('currenttime', time)
  alarmClock.notifyMeOnTime(emitTime)
  
  const emitAlarmTime = time => socket.emit('alarmtime', time)
  alarmClock.notifyMeOnAlarmTime(emitAlarmTime)
  
  socket.on('disconnect', () => {
    alarmClock.unsubscribeMeFromTime(emitTime)
    alarmClock.unsubscribeMeFromAlarmTime(emitAlarmTime)
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
