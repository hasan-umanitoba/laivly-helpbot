/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
}

/**
 * Method to register any events that needs to be triggered prior to registerAfter()
 * @param {BoltApp} app 
 * @param {Action} action 
 */
async function register(app, action) {
  app.action(action.pattern, async ({ ack, body, context, say }) => {
    await ack();
    await say(action.response.text);
  });
}

/**
 * Method to register the last events, usually fallbacks
 * @param {BoltApp} app 
 */
async function registerAfter(app) {
}

module.exports = {
  registerBefore, register, registerAfter
}