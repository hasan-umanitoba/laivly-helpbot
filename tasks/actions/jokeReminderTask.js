async function exec() {

    return {
        "blocks": [
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "When "
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
                            "text": "Once a day",
                            "emoji": true
                        },
                        "value": "1",
                        "action_id": "jokeReminder_once"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Twice a day",
                            "emoji": true
                        },
                        "value": "2",
                        "action_id": "jokeReminder_twice"
                    },

                ]
            }
        ]
    }
}

module.exports = {
  exec
}