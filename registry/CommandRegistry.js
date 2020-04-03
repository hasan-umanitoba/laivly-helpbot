// TODO: Properly implement CommandRegistry

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
  app.command(action.pattern, async ({ command, ack, say }) => {
    await ack();
    await say(`${command.text}`);
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