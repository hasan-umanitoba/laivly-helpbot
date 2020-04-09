const activityApi = require('../../apis/ActivityApi');
const tokens = require('../../constants/tokens');

/**
 * @param {Task} task 
 * @param {String} text 
 * @param {SlackPayload} payload 
 */
async function exec(task, text, payload) {
  const params = (payload.text || '').trim().split(' ');
  const type = params[0].trim();
  const sections = [];
  let title = '';
 
  // TODO: Refactor this
  switch (type) {
    case '!random': {
      title = `_Random Activity:_\n`;
      
      const activities = await activityApi.getAllActivities(task.query);
      const position = parseInt(Math.random() * activities.length);
      
      sections.push(
        formatMessage(activities[position])
      );

      break;
    }
    case '!list': {
      title = `_All Activities:_\n`;
      
      const activities = await activityApi.getAllActivities(task.query);

      for (let i = 0; i < activities.length; i++) {
        sections.push({
          type: 'divider'
        });  

        sections.push(
          formatMessage(activities[i])
        );
      }
      
      break;
    }
    case '!find': {
      const param = params[1] ? params[1].trim() : '';
      const activities = await activityApi.getActivitiesByName(param);

      for (let i = 0; i < activities.length; i++) {
        sections.push({
          type: 'divider'
        });  

        sections.push(
          formatMessage(activities[i])
        );
      }

      title = activities.length ? `_Activities with the title '${param}':_\n` : `_No Activities found with the title '${param}'_\n`;
      
      break;
    }
    case '!latest':
    default: {
      const activities = await activityApi.getAllActivities(task.query);
      const param = params[1] ? parseInt(params[1].trim()) : 0;
      let quantity = param && param > 0 ? param : 1;
      
      if (activities.length < quantity) quantity = activities.length;

      for (let i = 0; i < quantity; i++) {
        sections.push({
          type: 'divider'
        });
    
        sections.push(
          formatMessage(activities[i])
        );
      }

      title = `_Latest ${quantity} Activities:_`;

      break;
    }
  }

  sections.unshift(
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: title
      }
    }
  );

  return {
    blocks: sections
  }
}

/**
 * @param {Activity} activity
 * @returns {String}
 */
function formatMessage(activity) {
  let template = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*[TITLE]*\n[TEXT]'
    }
  };

  if (activity.template) {
    template = activity.template;
  }

  let result = JSON.stringify(template)
    .replace(tokens.TITLE, activity.title)
    .replace(tokens.TEXT, activity.text)
    .replace(tokens.PICTURE, activity.picture);

  return JSON.parse(result);
}

module.exports = {
  exec
}