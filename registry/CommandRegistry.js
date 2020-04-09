/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
  app.command('/friday:help', async ({ ack, command, say }) => {
    await ack();

    let text; 
    try {
      const taskModule = require(`../tasks/commands/handleFridayHelpTask.js`);

      text = await taskModule.exec();      
    }
    catch (error) {
      console.error(error);
    }
    await say(text);
  });
  app.command('/friday:resources', async ({ ack, command, say }) => {
    await ack();
    
    let text;
    try {
      const taskModule = require(`../tasks/commands/handleFridayResourcesTask.js`);

      text = await taskModule.exec(command);          
    }
    catch (error) {
      console.error(error);
    }
    await say(text);
  });  
  app.command('/friday:remind', async ({ ack, command ,context, say }) => {   
    await ack();
    let text;
    try {
      const taskModule = require(`../tasks/commands/handleFridayRemindTask.js`);

      text = await taskModule.exec(command);        
   
      const result = await app.client.chat.postEphemeral({
        token: context.botToken,
        channel: command.channel_id,
        user: command.user_id,
        blocks: text,
    });

    }
    catch (error) {
      console.error(error);
    }
  }); 
  
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