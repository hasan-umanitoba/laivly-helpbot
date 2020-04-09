/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
  app.view('event_view', async ({ ack, body, view, context}) => {
    // Acknowledge the view_submission event
    await ack();
    const taskModule = require(`../tasks/views/eventViewsTask.js`);   
    const result = await taskModule.exec(body, view, context);        
});
}

/**
 * Method to register any events that needs to be triggered prior to registerAfter()
 * @param {BoltApp} app 
 * @param {Listener} listener 
 */
async function register(app, listener) {
  app.shortcut(listener.pattern, async ({ ack, body, view, context }) => {
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