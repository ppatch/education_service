var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multer = require('multer')
//var upload = multer({ dest: 'uploads/' })

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//上传图片所安装的multer需要添加的
app.use(multer({ dest: './public/images/',
  rename: function (fieldname, fileName) {
    return fileName;
  }
   //onFileUploadStart: function (file) {
   // console.log(file.originalname + ' is starting ...')
   //},
   //onFileUploadComplete: function (file) {
   // console.log(file.fieldname + ' uploaded to  ' + file.path)
   // done=true;
   //}
}));
//app.post('/profile', upload.single('avatar'), function (req, res, next) {
//  // req.file is the `avatar` file
//})
//
//app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//  // req.files is array of `photos` files
//})
//
//var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//app.post('/cool-profile', cpUpload, function (req, res, next) {
//  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//  //
//  // e.g.
//  //  req.files['avatar'][0] -> File
//  //  req.files['gallery'] -> Array
//})
/*---------------------------------------------*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//新增加的
app.all('*', function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  //删除的
  //res.header("Accedd-Control-Allow-Origin", "X-Reqquested-With");
  //增加的
  res.header("Access-Control-Allow-Headers", "Content-Type, x-xsrf-token");
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS,DELETE,PUT');

  next();

});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
