async function exec(app, context, body, payload, respond) {
    var waterReminderMessage = "*Please Drink Water! and stay Hydrated :droplet:*"
    var intervalTime = 3600;
    var everydayTimeGap = 25200;
    var timeLength = parseInt(payload.value, 10);
    var totalDayReminders = 8;
    var newDate = new Date();
    newDate.setSeconds(newDate.getSeconds() + 20);
    var timetoCall = Math.round((newDate.getTime() / 1000));

    for (let k = 0; k < timeLength; k++) {
        timetoCall += intervalTime; // reminds to drink water after every hour 8 times a day
        for (let i = 0; i < totalDayReminders; i++) {
            const result = await app.client.chat.scheduleMessage({
                token: context.botToken,
                channel: body.user.id,
                post_at: timetoCall,
                text: waterReminderMessage
            });
        }
        timetoCall += everydayTimeGap // Begins the next day reminder after 7 hour gap
    }
    const sendReminderNow = app.client.chat.postMessage({
        token: context.botToken,
        channel: body.channel.id,
        text: waterReminderMessage
    });
    await respond('Your Water Reminder is set Successfully!\n Do you know ? When dehydrated, the skin can become more vulnerable to skin disorders and wrinkling.');
}

module.exports = {
  exec
}