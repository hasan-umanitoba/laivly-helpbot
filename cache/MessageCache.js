const cache = require('./instance');
const messageTsKey = 'message.ts:';

/**
 * @param {String} channel
 * @param {String} ts
 * @param {String} userId
 * @returns {Boolean}
 */
function getMessageByTs(channel, ts, userId) {
  const key = formatKey(messageTsKey, channel, ts, userId);
 
  return cache.get(key);
}

/**
 * @param {String} channel
 * @param {String} ts
 * @param {String} userId
 * @param {String} text
 * @returns {Boolean}
 */
function setMessageByTs(channel, ts, userId, text) {
  try {
    const key = formatKey(messageTsKey, channel, ts, userId);
    cache.set(key, text);
  
    return true;
  } catch(e) {
    console.log(e);
    
    return false;
  }
}

/**
 * @param {String} key
 * @param {String} channel
 * @param {String} ts
 * @param {String} userId
 * @returns {String}
 */
function formatKey(key, channel, ts, userId = '') {
  return `${key}${channel}${ts}${userId}`;
}

module.exports = {
  getMessageByTs, setMessageByTs
}