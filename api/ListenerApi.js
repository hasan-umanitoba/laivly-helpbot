const axios = require('axios');

const helpbotUri = process.env.HELPBOT_API_URI;

/**
 * @returns {Array<Listener>|null}
 */
async function getAllListeners() {
  let listeners = null;

  try {
    listeners = await axios.get(`${helpbotUri}/listeners/`);
  } catch(e) {
    console.log(e);
  }

  return listeners ? listeners.data : null;
}

module.exports = {
  getAllListeners
}