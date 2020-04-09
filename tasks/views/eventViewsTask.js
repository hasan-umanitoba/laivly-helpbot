const { google } = require('googleapis')
const axios = require('axios');

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
    '935658507768-2prc28blmkr4nfa27n5p4kdmnmb2k527.apps.googleusercontent.com',
    'ox2l2gKj_YQOIl6-aXc9HYEn'
)

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
    refresh_token: '1//04cdnG66CqK55CgYIARAAGAQSNwF-L9IrysWuj2tolhYWBkGES9kuwLLLOYWMO2i0IkhIa7a-zZ9dVXrTMVWr9hn1GWYr21Y-qKk',
})


async function exec(body, view, context) {
    var valuesObject = view.state.values;
    var eventCreated = false;
    const timeValue = valuesObject.time_input.TimeSelect.selected_option.value;
    const dateSelected = valuesObject.date_input.date_select.selected_date;
    const textSelected = valuesObject.user_input.description_input.value;
    const durationSelected = parseInt(valuesObject.duration_input.duration.selected_option.value);
    var Timehours = parseInt(timeValue);
    var newDate = new Date(dateSelected);
    newDate.setHours(newDate.getHours() + 5); // Adjusting time zone.
    newDate.setHours(Timehours);
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    const eventStartTime = new Date(dateSelected);
    eventStartTime.setHours(eventStartTime.getHours() + 5); // Adjusting time zone for Start Date
    eventStartTime.setHours(Timehours);
    // Create a new event end date instance for temp uses in our calendar.
    const eventEndTime = new Date(dateSelected)
    eventEndTime.setHours(eventEndTime.getHours() + 5); // Adjusting time zone for end Date 
    eventEndTime.setHours(Timehours);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + durationSelected);
    const event = {
        summary: `Meeting`,
        description: textSelected,
        colorId: 5,
        start: {
            dateTime: eventStartTime,
            timeZone: 'Etc/GMT-5',
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'Etc/GMT-5',
        },
    }

    // Check if we a busy and have an event on our calendar for the same time.
    calendar.freebusy.query(
        {
            resource: {
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                timeZone: 'Etc/GMT-5',
                items: [{ id: 'primary' }],
            },
        },
        (err, res) => {
            // Check for errors in our query and log them if they exist.
            if (err) return console.error('Free Busy Query Error: ', err)

            // Create an array of all events on our calendar during that time.
            const eventArr = res.data.calendars.primary.busy

            // Check if event array is empty which means we are not busy
            if (eventArr.length === 0)
                // If we are not busy create a new calendar event.
                return calendar.events.insert(
                    { calendarId: 'primary', resource: event },
                    err => {
                        // Check for errors and log them if they exist.
                        if (err) return console.error('Error Creating Calender Event:', err)
                        // Else log that the event was created.
                        try {
                            const result = app.client.chat.postMessage({
                                token: context.botToken,
                                channel: body.user.id,
                                text: 'Event Reminder is set Successfully! You will be reminded of the event in Slack and Google Calendar'
                            });

                        }
                        catch (error) {
                            console.error(error);
                        }
                        eventCreated = true;
                        return console.log('Calendar event successfully created.')
                    }
                )

            // If event array is not empty log that we are busy.
            try {
                const result = app.client.chat.postMessage({
                    token: context.botToken,
                    channel: body.user.id,
                    text: 'Sorry there is another event at the same time. Please select a different time'
                });

            }
            catch (error) {
                console.error(error);
            }
            return console.log(`Sorry I'm busy...`)
        }
    )
    if (eventCreated) {
        var slackReminderTime = newDate.getTime() / 1000;
        const user = body['user']['id'];
        try {
            const result = await app.client.chat.scheduleMessage({
                token: context.botToken,
                channel: user,
                post_at: slackReminderTime,
                text: textSelected
            });

        }
        catch (error) {
            console.error(error);
        }
    }
}

module.exports = {
  exec
}