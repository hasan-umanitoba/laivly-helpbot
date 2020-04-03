/**
 * @param {Object} params 
 */
async function preventMultipleMessages({ message, next }) {
  if (!message.isAnswered) {
    message.isAnswered = true;
    await next();
  }
}

/**
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
 * @param {BoltApp} app 
 * @param {Action} action 
 */
async function register(app, action) {
  app.message(new RegExp(action.pattern), preventMultipleMessages, async ({ message, say }) => {
    await say(action.response.text);
  });
}

/**
 * @param {BoltApp} app 
 */
async function registerAfter(app) {
  app.message(/.*/, preventMultipleMessages, async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`This if a fallback message, <@${message.user}>!`);
  });
}

module.exports = {
  registerBefore, register, registerAfter
}