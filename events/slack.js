const slackService = require('../services/SlackService');

// @slack/event-api
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);

function register(app) {
    // Plug the adapter in as a middleware
    app.use('/api/slack/events', slackEvents.requestListener());
}

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    //slackService.postMessage(event);
});
  
slackEvents.on('app_mention', (event) => {
    console.log(`Received a mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    slackService.postMessage(event);
});

module.exports = {
    register
};