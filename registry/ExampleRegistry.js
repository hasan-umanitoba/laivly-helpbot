/**
 * Method to register any events that needs to be triggered prior to register()
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
}

/**
 * Method to register any events that needs to be triggered prior to registerAfter()
 * @param {BoltApp} app 
 * @param {Listener} listener 
 */
async function register(app, listener) {
}

/**
 * Method to register the last events, usually fallbacks
 * @param {BoltApp} app 
 */
async function registerAfter(app) {
}

module.exports = {
  registerBefore, register, registerAfter
}