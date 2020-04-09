const sentimentEngineApi = require('../apis/SentimentEngineApi');

/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
  // Listens to incoming messages that contain "hello"
  app.message(/hello/i, preventMultipleResponses, async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
  });
}

/**
 * Method to register any events that needs to be triggered prior to registerAfter()
 * @param {BoltApp} app 
 * @param {Listener} listener 
 */
async function register(app, listener) {
  app.message(new RegExp(listener.pattern, 'i'), preventMultipleResponses, async ({ message, say }) => {
    await say(listener.data.text);
  });
}

/**
 * Method to register the last events, usually fallbacks
 * @param {BoltApp} app 
 */
async function registerAfter(app) {
  app.message(/.*/, preventMultipleResponses, async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    const data = await sentimentEngineApi.sendMessage(message.text);

    if (data) {
      await say(data.response);
    }
  });
}

/**
 * @param {Object} params 
 */
async function preventMultipleResponses({ message, next }) {
  if (!message.isAnswered) {
    message.isAnswered = true;
    await next();
  }
}

module.exports = {
  registerBefore, register, registerAfter
}