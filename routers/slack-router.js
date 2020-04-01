const express = require('express');
const slack = require('../services/SlackService');
const app = express();
const router = express.Router();

// @slack/event-api
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

const node = "slack";

router.get('/bot-info', async (request, response) => {
    response.json(await slack.getBotInfo());
});

router.post('/events', (request, response) => {
    routerresponse.json({ challenge: request.body.challenge });
});

// Plug the adapter in as a middleware
app.use('/api/slack/events', slackEvents.requestListener());

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    //slack.postMessage(event);
});
  
slackEvents.on('app_mention', (event) => {
    console.log(`Received a mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    slack.postMessage(event);
});

module.exports = router;