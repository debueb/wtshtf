'use strict';

module.exports = (function() {
  const https = require('https');
  var emailService = require('./email-service.js'),
      userService = require('./user-service.js'),
      radiationLevels = ['100', '200', '300', '500', '2000'],
      thresholdLevel = 2;

  function check() {
    console.log('checking radiation data');
    https.get('https://redata.jrc.ec.europa.eu//gis/ogc/?Request=Execute&Service=WPS&Version=1.0.0&Language=en-EN&Identifier=HexBinGDRv4&RawDataOutput=dailyValues&DataInputs=bboxInput=-217.79296875000006,47.94929727697105,237.83203125000006,55.93761587980974,urn:ogc:def:crs:EPSG::4326;ZoomLevel=4;format=GeoJson;classification=classified;&_=1480846455686', (res) => {
      if (res.statusCode === 200) {
        var body = '';
        res.on('data', function(chunk) {
          body += chunk;
        });
        res.on('end', function() {
          var json = JSON.parse(body);
          for (var i=0; i<json.features.length; i++){
            var feature = json.features[i];
            if (feature.properties.avg > thresholdLevel){
              userService.findVerified(function(err, users){
                  if (err){
                    emailService.sendMail([process.env.DEFAULT_EMAIL], 'WTSHTF issue', `Unable to retrive list of users: ${err}`);
                  } else {
                    let emailArray = [];
                    users.forEach(function(user){
                      emailArray.push(user.email);
                    });
                    emailService.sendMail(emailArray, 'Gamma Radiation Alert', `The average Gamma Radiation in at least one station surpasses ${radiationLevels[thresholdLevel]}nSv/hour.\n\nPlease check the following map for details:\nhttps://remap.jrc.ec.europa.eu/GammaDoseRates.aspx[[data-msys-clicktrack="0"]]\n\nUse the following link to unsubscribe:\nhttp://${process.env.HEROKU_APP_NAME}.herokuapp.com/registration/unsubscribe[[data-msys-clicktrack="0"]]`);
                  }
              });
              break;
            }
          }
        });
      } else {
        emailService.sendMail([process.env.DEFAULT_EMAIL], 'WTSHTF issue', `radiation endpoint returned ${res.statusCode}`);
      }
    }).on('error', (e) => {
      emailService.sendMail([process.env.DEFAULT_EMAIL], 'WTSHTF issue', `error while querying radiation endpoint: ${e}`);
    });
  }
  return {
    check: check
  };
}());
