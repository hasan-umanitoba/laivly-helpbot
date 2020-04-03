const actionService = require('../services/ActionService');
const registries = new Map([
  ['message', require('./MessageRegistry')],
  ['action', require('./ActionRegistry')],
  ['command', require('./CommandRegistry')]
]);

/**
 * @param {BoltApp} app
 */
async function init(app) {
  // Fetch all actions from the DB
  const actions = await fetch();
  // Register all actions that that needs to happen before register()
  await registerBefore(app);
  // Register all actions from the DB
  await register(app, actions);
  // Register any actions that needs to happen after register()
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