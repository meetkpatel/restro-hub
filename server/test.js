const accountSid = 'ACb2f34e3fd70d87802a4b6875e32913fb';
const authToken = '121f681c5f9521b266fea0bc25873b20';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+19522280729',
    from: '+12674353506',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?'
  });
