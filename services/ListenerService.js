const listenerApi = require('../apis/ListenerApi');

/**
 * @returns {Array<Listener>}
 */
async function fetchListeners() {
  const listeners = await listenerApi.getAllListeners();

  return listeners || [];
}

module.exports = {
  fetchListeners
}