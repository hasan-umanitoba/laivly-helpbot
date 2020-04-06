require('dotenv').config({ path: __dirname + '/.env' });
const registry = require('./registry');

const port = process.env.PORT || 3000;

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Register all listeners present in the DB
(async () => {
  await registerListeners();
})();

(async () => {
  // Start your app
  await app.start(port);

  console.log('⚡️ Bolt app is running!');
})();

async function registerListeners() {
  // Register listeners
  await registry.init(app);
}