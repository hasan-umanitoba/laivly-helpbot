const actionApi = require('../api/ActionApi');

async function fetchActions() {
  const actions = await actionApi.getAllActions();

  return actions || [];
}

module.exports = {
  fetchActions
}