const axios = require('axios');

async function exec(app, context, body, payload, respond) {
    var randomJoke = "";
    var intervalTime = 10800; // after 3 Hours
    var totalDayReminders = parseInt(payload.value, 10);
    var newDate = new Date();
    var timetoCall = Math.round((newDate.getTime() / 1000));

    for (let i = 0; i < totalDayReminders + 1; i++) {
        axios.get('http://api.icndb.com/jokes/random').then(res => {
            randomJoke = res.data.value.joke;
            const params = {
                icon_emoji: ':laughing:'
            };
            randomJoke = "*" + randomJoke + ":joy: *";
            if (i == 0) {
                const sendJokeNow = app.client.chat.postMessage({
                    token: context.botToken,
                    channel: body.channel.id,
                    text: randomJoke
                });
            }
            else {
                timetoCall += intervalTime; // Sends a joke after 3 Hours
                const result = app.client.chat.scheduleMessage({
                    token: context.botToken,
                    channel: body.channel.id,
                    post_at: timetoCall,
                    text: randomJoke
                });
            }
        });
    }
    await respond('Done! I will send you jokes to keep you happy :joy:')
}

module.exports = {
  exec
}


