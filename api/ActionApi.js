const axios = require('axios');

const helpbotUri = process.env.HELPBOT_API_URI;

/**
 * @returns {Array<Action>|null}
 */
async function getAllActions() {
  let actions = null;

  try {
    actions = await axios.get(`${helpbotUri}/actions/`);
  } catch(e) {
    console.log(e);
  }

  return actions ? actions.data : null;
}

module.exports = {
  getAllActions
}