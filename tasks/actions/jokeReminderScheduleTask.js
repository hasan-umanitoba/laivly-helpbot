const axios = require('axios');

async function exec(app,context,body,payload,respond) {
    var randomJoke = "";
    var intervalTime = 10800; // after 3 Hours
    var totalDayReminders = parseInt(payload.value, 10);
        
    const abc = axios.get('http://api.icndb.com/jokes/random').then(res => {
        randomJoke = res.data.value.joke;
        const params = {
           icon_emoji: ':laughing:'
        };
        var newDate = new Date();
        newDate.setSeconds(newDate.getSeconds() + 10);

        var timetoCall = Math.round((newDate.getTime() / 1000));
        for (let i = 0; i < totalDayReminders; i++) {
            const result = app.client.chat.scheduleMessage({
                token: context.botToken,
                channel: body.channel.id,
                post_at: timetoCall,
                text: randomJoke
            });
            timetoCall += intervalTime; // reminds to drink water after every hour 8 times a day
        }
    });
    await respond('Done! I will send you jokes to keep you happy')
}

module.exports = {
  exec
}