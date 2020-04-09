async function exec() {

    return {
        "type": "modal",
        "callback_id": "event_view",

        "title": {
            "type": "plain_text",
            "text": "Create a reminder",
            "emoji": true
        },
        "submit": {
            "type": "plain_text",
            "text": "Submit",
            "emoji": true
        },
        "close": {
            "type": "plain_text",
            "text": "Cancel",
            "emoji": true
        },
        "blocks": [
            {
                "type": "input",
                "block_id": "date_input",

                "element": {
                    "type": "datepicker",
                    "initial_date": "2020-04-28",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select a date",
                        "emoji": true
                    },
                    "action_id": "date_select"
                },
                "label": {
                    "type": "plain_text",
                    "text": "When",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "time_input",

                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select a Time",
                        "emoji": true
                    },
                    "action_id": "TimeSelect",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Midnight",
                                "emoji": true
                            },
                            "value": "0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "1:00 AM",
                                "emoji": true
                            },
                            "value": "1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "2:00 AM",
                                "emoji": true
                            },
                            "value": "2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "3:00 AM",
                                "emoji": true
                            },
                            "value": "3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "4:00 AM",
                                "emoji": true
                            },
                            "value": "4"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "5:00 AM",
                                "emoji": true
                            },
                            "value": "5"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "6:00 AM",
                                "emoji": true
                            },
                            "value": "6"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "7:00 AM",
                                "emoji": true
                            },
                            "value": "7"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "8:00 AM",
                                "emoji": true
                            },
                            "value": "8"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "9:00 AM",
                                "emoji": true
                            },
                            "value": "9"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "10:00 AM",
                                "emoji": true
                            },
                            "value": "10"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "11:00 AM",
                                "emoji": true
                            },
                            "value": "11"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Noon",
                                "emoji": true
                            },
                            "value": "12"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "1:00 PM",
                                "emoji": true
                            },
                            "value": "13"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "2:00 PM",
                                "emoji": true
                            },
                            "value": "14"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "3:00 PM",
                                "emoji": true
                            },
                            "value": "15"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "4:00 PM",
                                "emoji": true
                            },
                            "value": "16"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "5:00 PM",
                                "emoji": true
                            },
                            "value": "17"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "6:00 PM",
                                "emoji": true
                            },
                            "value": "18"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "7:00 PM",
                                "emoji": true
                            },
                            "value": "19"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "8:00 PM",
                                "emoji": true
                            },
                            "value": "20"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "9:00 PM",
                                "emoji": true
                            },
                            "value": "21"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "10:00 PM",
                                "emoji": true
                            },
                            "value": "22"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "11:00 PM",
                                "emoji": true
                            },
                            "value": "23"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "Time",
                    "emoji": true
                }
            },

            {
                "type": "input",
                "block_id": "duration_input",

                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an option",
                        "emoji": true
                    },
                    "action_id": "duration",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "15 Minutes",
                                "emoji": true
                            },
                            "value": "15"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "30 Minutes",
                                "emoji": true
                            },
                            "value": "30"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "45 Minutes",
                                "emoji": true
                            },
                            "value": "45"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "60 Minutes",
                                "emoji": true
                            },
                            "value": "60"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "90 Minutes",
                                "emoji": true
                            },
                            "value": "90"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "Duration",
                    "emoji": true
                }
            },

            {
                "type": "input",
                "block_id": "user_input",

                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "description_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Description",
                    "emoji": true
                }
            }
        ]
    }
}

module.exports = {
  exec
}