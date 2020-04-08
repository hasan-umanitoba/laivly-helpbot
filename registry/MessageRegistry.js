/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
  // Listens to incoming messages that contain "hello"
  app.message(/hello/i, preventMultipleMessages, async ({ message, say }) => {
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
  app.message(new RegExp(listener.pattern, 'i'), preventMultipleMessages, async ({ message, say }) => {
    await say(listener.data.text);
  });
}

/**
 * Method to register the last events, usually fallbacks
 * @param {BoltApp} app 
 */
async function registerAfter(app) {
  app.message(/.*/, preventMultipleMessages, async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`This if a fallback message, <@${message.user}>!`);
  });
}

/**
 * @param {Object} params 
 */
async function preventMultipleMessages({ message, next }) {
  if (!message.isAnswered) {
    message.isAnswered = true;
    await next();
  }
}

module.exports = {
  registerBefore, register, registerAfter
}