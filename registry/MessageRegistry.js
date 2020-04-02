async function register(app, action) {
  app.message(new RegExp(action.pattern), async ({ message, say }) => {
    await say(action.response.text);
  });
}

module.exports = {
  register
}