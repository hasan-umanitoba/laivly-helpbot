const listenerService = require('../services/ListenerService');
const registries = new Map([
  ['message', require('./MessageRegistry')],
  ['action', require('./ActionRegistry')],
  ['command', require('./CommandRegistry')],
  ['event', require('./EventRegistry')],
  ['view', require('./ViewRegistry')]
]);

/**
 * @param {BoltApp} app
 */
async function init(app) {
  // Fetch all listeners from the DB
  const listeners = await fetch();
  // Register all listeners that that needs to happen before register()
  await registerBefore(app);
  // Register all listeners from the DB
  await register(app, listeners);
  // Register any listeners that needs to happen after register()
  await registerAfter(app);
}

/**
 * @returns {Array<Listener>}
 */
async function fetch() {
  return await listenerService.fetchListeners();
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
async function register(app, listeners) {
  listeners.forEach((listener) => {
    const registry = registries.get(listener.type);

    console.log(`Registering '${listener.type}@${listener.pattern}`);
    
    registry
      ? registry.register(app, listener)
      : console.log(`Registry for ${listener.type} not found`);
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