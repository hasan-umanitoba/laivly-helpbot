const actionService = require('../services/ActionService');
const registries = new Map([
  ['message', require('./MessageRegistry')],
  ['action', require('./ActionRegistry')]
]);

/**
 * @param {BoltApp} app
 */
async function init(app) {
  const actions = await fetch();
  await registerBefore(app);
  await register(app, actions);
  await registerAfter(app);
}

/**
 * @returns {Array<Action>}
 */
async function fetch() {
  return await actionService.fetchActions();
}

/**
 * @param {BoltApp} app  
 */
async function registerBefore(app) {
  registries.forEach(registry => registry.registerBefore(app));
}

/**
 * @param {BoltApp} app
 */
async function register(app, actions) {
  actions.forEach((action) => {
    const registry = registries.get(action.type);
    
    registry
      ? registry.register(app, action)
      : console.log(`Registry for ${action.type} not found`);
  });
}

/**
 * @param {BoltApp} app  
 */
async function registerAfter(app) {
  registries.forEach(registry => registry.registerAfter(app));
}

module.exports = {
  init
}