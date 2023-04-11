const accountSid = 'AC66d6fe1abfd6343e34fbf9704a4ee8a8';
const authToken = '8dce821f8453379fd019677682ad8b09';
const client = require('twilio')(accountSid, authToken);

const sendSMS = (to, message) => {
  client.messages
    .create({
      body: message+" Stock Added",
      from: '+19786781868',
      to: to
    })
    .then(message => console.log(message.sid))
    .catch(error => console.log(error));
};


module.exports = sendSMS;
