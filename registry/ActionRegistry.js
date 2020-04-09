/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
  app.action('waterReminder_pressed', async ({ ack, respond, context }) => {
    await ack();
    let text;
    try {
      const taskModule = require(`../tasks/actions/waterReminderTask.js`);   
      text = await taskModule.exec();        
  
      await respond(text);
      
    }
    catch (error) {
      console.error(error);
    }
  }); 
  app.action(/^(waterReminder_today|waterReminder_week|waterReminder_month).*/, async ({ body, ack, respond, context, payload }) => {
    await ack();
    try {
      const taskModule = require(`../tasks/actions/waterReminderScheduleTask.js`);   
      const result = await taskModule.exec(app,context,body,payload,respond);              
    }
    catch (error) {
      console.error(error);
    }
  });  
  app.action('jokeReminder_pressed', async ({ ack, respond, context }) => {
    await ack();
    let text;
    try {
      const taskModule = require(`../tasks/actions/jokeReminderTask.js`);   
      text = await taskModule.exec();        
  
      await respond(text);
      
    }
    catch (error) {
      console.error(error);
    }
  });
  app.action(/^(jokeReminder_twice|jokeReminder_once).*/, async ({ body, ack, respond, context, payload }) => {
    await ack();
    try {
      const taskModule = require(`../tasks/actions/jokeReminderScheduleTask.js`);   
      const result = await taskModule.exec(app,context,body,payload,respond);              
    }
    catch (error) {
      console.error(error);
    }
  });  
  app.action('eventReminder_pressed', async ({ ack, body, context }) => {
    await ack();
    let text;
    try {
      const taskModule = require(`../tasks/actions/eventReminderTask.js`);   
      view = await taskModule.exec();        
  
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view:view
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
  app.action(listener.pattern, async ({ ack, body, context, say }) => {
    await ack();
    
    let text = listener.data.text || '';
    
    if (Array.isArray(listener.data.tasks)) {
      for (const task of listener.data.tasks) {
        try {
          const taskModule = require(`../tasks/actions/${task.fileName}.js`);
          
          text = await taskModule.exec(task, text);
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