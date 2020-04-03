const actionApi = require('../api/ActionApi');

/**
 * @returns {Array<Action>}
 */
async function fetchActions() {
  const actions = await actionApi.getAllActions();

  return actions || [];
}

module.exports = {
  fetchActions
}