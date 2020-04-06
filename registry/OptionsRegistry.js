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
  app.shortcut(action.pattern, async ({ ack, options }) => {
    await ack();
    try {
      throw new Error(`Not Implemented`);
    }
    catch (error) {
      console.error(error);
    }
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