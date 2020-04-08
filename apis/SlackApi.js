const axios = require('axios');

const slackUri = process.env.SLACK_URI;
const config = {
  headers: { Authorization: `Bearer ${process.env.SLACK_TOKEN}` }
};

/**
 * @param {String} email
 * @returns {User}
 */
async function fetchUserByEmail(email) {
  let response = null;

  try {
    response = await axios.get(`${slackUri}/users.lookupByEmail?email=${email}`, config);
  } catch(e) {
    console.log(e);
  }

  return response && response.data.ok ? response.data : null;
}

/**
 * @param {String} channelId
 * @param {String} ts
 * @returns {Message|null}
 */
async function fetchMessageByTs(channelId, ts) {
  const threshold = 0.000001;
  const parsedTs = parseFloat(ts)
  const startTs = parsedTs - threshold;
  const endTs = parsedTs + threshold;
  const limit = 1;
  const response = await fetchMessagesBetweenTs(channelId, `${startTs}`, `${endTs}`, limit);

  return response ? response.messages[0] : null;
}

/**
 * @param {String} channelId
 * @param {String} startTs
 * @param {String} endTs
 * @returns {Array<Message>|null}
 */
async function fetchMessagesBetweenTs(channelId, startTs, endTs, limit = 25) {
  let response = null;

  try {
    response = await axios.get(`${slackUri}/conversations.history?channel=${channelId}&oldest=${startTs}&latest=${endTs}&limit=${limit}`, config);
  } catch(e) {
    console.log(e);
  }

  return response && response.data.ok ? response.data : null;
}

module.exports = {
  fetchUserByEmail, fetchMessageByTs, fetchMessagesBetweenTs
}