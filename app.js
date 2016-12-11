var express = require('express'),
    bodyParser = require('body-parser'),
    cron = require('node-cron'),
    radiationService = require('./services/radiation-service.js');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/* routes */
app.use('/', require('./routes/index'));
app.use('/registration', require('./routes/registration'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

cron.schedule('*/1 * * * *', function(){
  radiationService.check();
});
radiationService.check();
