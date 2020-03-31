// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require('body-parser');
const slack = require('./slack');
require('dotenv').config({path: __dirname + '/.env'});

// @slack/event-api
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

const app = express();
const port = process.env.PORT || 3000;

// Plug the adapter in as a middleware
app.use('/api/slack/events', slackEvents.requestListener());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/api/slack/bot-info', async (request, response) => {
  response.json(await slack.getBotInfo());
});

app.post('/api/slack/events', (request, response) => {
  response.json({ challenge: request.body.challenge });
});

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  //slack.postMessage(event);
});

slackEvents.on('app_mention', (event) => {
  console.log(`Received a mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  slack.postMessage(event);
});