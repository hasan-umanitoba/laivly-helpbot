require('dotenv').config({path: __dirname + '/.env'});
const registry = require('./registry');

const port = process.env.PORT || 3000;

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Register all actions present in the DB
(async () => {
  // Register actions
  await registry.init(app);
});

// Listens to incoming messages that contain "hello"
app.message(/hello/i, async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

// Listens to incoming messages that contain "hello"
app.message(/.*/, async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`This if a fallback message, <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start(port);

  console.log('⚡️ Bolt app is running!');
})();