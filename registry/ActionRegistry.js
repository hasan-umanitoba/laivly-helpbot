/**
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
}

/**
 * @param {BoltApp} app 
 * @param {Action} action 
 */
async function register(app, action) {
  app.action(action.pattern, async ({ ack, say }) => {
    await ack();
    await say(action.response.text);
  });
}

/**
 * @param {BoltApp} app 
 */
async function registerAfter(app) {
}

module.exports = {
  registerBefore, register, registerAfter
}