const messageRegistry = require('./MessageRegistry');
const actionService = require('../services/ActionService');

async function init(app) {
  const actions = await fetch();
  register(app, actions);
}

async function fetch() {
  return await actionService.fetchActions();
}

async function register(app, actions) {
  actions.forEach((action) => {
    switch (action.type) {
      case 'message': {
        messageRegistry.register(app, action);

        break;
      }
    }
  });
}

module.exports = {
  init
}