/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
}

/**
 * Method to register any events that needs to be triggered prior to registerAfter()
 * @param {BoltApp} app 
 * @param {Listener} listener 
 */
async function register(app, listener) {
  app.command(listener.pattern, async ({ ack, say, body, context }) => {
    await ack();
    
    let text = listener.response.text || '';
    
    if (Array.isArray(listener.response.tasks)) {
      for (const task of listener.response.tasks) {
        try {
          const taskModule = require(`../tasks/${task.fileName}.js`);
          
          text = await taskModule.exec(task, text);
        } catch(error) {
          console.log(`Error when requiring ${task.fileName}`, error, task);
        }
      }
    }

    await say(text);
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