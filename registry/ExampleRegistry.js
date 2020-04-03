// Please use this file as an example and don't change it.

/**
 * @param {BoltApp} app 
 */
async function registerBefore(app) {
  // Register any events that needs to be triggered prior to register()
}

/**
 * @param {BoltApp} app 
 * @param {Action} action 
 */
async function register(app, action) {
  // Register any events that needs to be triggered prior to registerAfter()
}

/**
 * @param {BoltApp} app 
 */
async function registerAfter(app) {
  // Register the last events, usually fallbacks
}

module.exports = {
  registerBefore, register, registerAfter
}