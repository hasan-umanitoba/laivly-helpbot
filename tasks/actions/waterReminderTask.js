async function exec() {

    return {
    "blocks": [
        {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": "How often do you want to get reminded ? Do you know A person can live about a month without food, but only about a week without water"
                }
            ]
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Today",
                        "emoji": true
                    },
                    "value": "1",
                    "action_id": "waterReminder_today"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "This Week",
                        "emoji": true
                    },
                    "value": "7",
                    "action_id": "waterReminder_week"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "This Month",
                        "emoji": true
                    },
                    "value": "30",
                    "action_id": "waterReminder_month"
                }
            ]
        }
    ]
    }
}

module.exports = {
  exec
}