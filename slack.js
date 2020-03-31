const { WebClient } = require('@slack/web-api');
// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.SLACK_TOKEN);

async function getBotInfo() {
  let botInfo = null;
  try {
    botInfo = await web.auth.test();
  } catch (error) {
    console.log(error);
  }

  return botInfo;
}

async function postMessage(event) {
  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: event.channel,
      text: `HONK!`,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBotInfo, postMessage
}