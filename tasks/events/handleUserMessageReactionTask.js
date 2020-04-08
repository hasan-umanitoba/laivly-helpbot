const userCache = require('../../cache/UserCache.js');
const messageCache = require('../../cache/MessageCache.js');
const api = require('../../apis/SlackApi');

/**
 * @param {TaskSchema} task 
 * @param {String} text 
 * @param {SlackEvent} event 
 */
async function exec(task, text, event) {
  const hasReaction = checkReaction(task.reactions, event.reaction);
  
  // Validate reaction first since it doesn't require either accessing the cache nor making api calls
  if (hasReaction) {
    const userIds = await fetchUserIds(task.emails);
    const hasUserId = checkUserId(userIds, event.item_user);
  
    // Check if hasUserId and if the item is a "message"
    if (hasUserId && event.item.type === 'message') {
      const text = await fetchMessageText(event.item.channel, event.item.ts, event.item_user);

      // Match the message text with the flag
      if (text && text.match(new RegExp(`.*${task.flag}.*`, 'i'))) {
        console.log(text);
        // A task may have subtasks as well, so whatever action we want to perform can be done by one or more subtasks.
      }
    }
  }

  return text;
}

/**
 * @param {Array<String>} emails
 * @returns {Array<String>}
 */
async function fetchUserIds(emails) {
  const userIds = [];

  for (const email of emails) {
    let user = userCache.getUserByEmail(email);

    if (!user) {
      const result = await api.fetchUserByEmail(email);

      if (result) {
        user = result.user;
        userCache.setUserByEmail(email, user);
      }
    }

    if (!userIds.includes(user.id)) {
      userIds.push(user.id);
    }
  }

  return userIds;
}

async function fetchMessageText(channel, ts, userId) {
  let text = messageCache.getMessageByTs(channel, ts, userId);

  if (!text) {
    // Fetch the message by Ts
    const result = await api.fetchMessageByTs(channel, ts);

    if (result) {
      text = result.text;
      messageCache.setMessageByTs(channel, ts, userId, text);
    } else {
      console.log(result);
    }
  }

  return text;
}

/**
 * @param {Array<String>} userIds 
 * @param {String} userId 
 */
function checkUserId(userIds, userId) {
  return userIds.includes(userId);
}

/**
 * @param {Array<String>} reactions 
 * @param {String} reaction 
 */
function checkReaction(reactions, reaction) {
  return reactions.includes('*') || reactions.includes(reaction);
}

module.exports = {
  exec
}