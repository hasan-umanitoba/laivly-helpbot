require('dotenv').config({ path: __dirname + '/.env' });
const registry = require('./registry');

const port = process.env.PORT || 3000;

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Register all actions present in the DB
(async () => {
  await registerEvents();
})();

(async () => {
  // Start your app
  await app.start(port);

  console.log('⚡️ Bolt app is running!');
})();

async function registerEvents() {
  // Register actions
  await registry.init(app);
}