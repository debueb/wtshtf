'use strict';

module.exports = (function() {
  var SparkPost = require('sparkpost'),
      client = new SparkPost(process.env.SPARKPOST_TOKEN);

  function sendMail(recipients, subject, body){
    var sparkRecipients = [];
    recipients.forEach(function(recipient){
        sparkRecipients.push({
          address: recipient
        })
    });

    return client.transmissions.send({
      content: {
        from: 'wtshtf@appsolve.de',
        subject: subject,
        text: body
      },
      recipients: sparkRecipients
    });
  };

  return {
    sendMail: sendMail
  };
}());
