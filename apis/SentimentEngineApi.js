const axios = require('axios');

const sentimentEngineUri = process.env.SENTIMENT_ENGINE_URI;

/**
 * @returns {Array<Listener>|null}
 */
async function sendMessage(text) {
  let response = null;

  try {
    response = await axios.post(
      `${sentimentEngineUri}/message`, { text }
    );
  } catch(e) {
    console.log(e);
  }

  return response ? response.data : null;
}

module.exports = {
  sendMessage
}