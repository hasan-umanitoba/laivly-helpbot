const axios = require('axios');

const helpbotUri = process.env.HELPBOT_API_URI;

/**
 * @returns {Array<Activity>|null}
 */
async function getAllActivities() {
  let activities = null;

  try {
    activities = await axios.get(`${helpbotUri}/activities/`);
  } catch(e) {
    console.log(e);
  }

  return activities ? activities.data : null;
}

/**
 * @returns {Array<Activity>|null}
 */
async function getActivitiesByName(name) {
  let activities = null;

  try {
    activities = await axios.get(`${helpbotUri}/activities/name/${name}`);
  } catch(e) {
    console.log(e);
  }

  return activities ? activities.data : null;
}

module.exports = {
  getAllActivities, getActivitiesByName
}