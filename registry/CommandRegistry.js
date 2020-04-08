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
  app.command(listener.pattern, async ({ ack, say, payload, body, context }) => {
    await ack();
    
    let text = listener.data.text || '';
    
    if (Array.isArray(listener.data.tasks)) {
      for (const task of listener.data.tasks) {
        try {
          const taskModule = require(`../tasks/commands/${task.fileName}.js`);
          
          text = await taskModule.exec(task, text, payload);
        } catch(error) {
          console.log(`Error when requiring ${task.fileName}`, error, task);
        }
      }
    }

    if (text) await say(text);
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