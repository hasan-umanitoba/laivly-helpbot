async function exec() {

    let text = {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Hey there 👋, Looks like you need help! Here are the available commands"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":one: `/hb:schedule` is used to create future messages to yourself! when you run the command, it also comes with pre-made options thats you can schedule for youself. Give it try!"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":two:`/hb:resources` Comes with several functions, you can find out who is on whats team `/hb:resources find @Name`, you can find out whos the most likely to know things `/hb:resources whoknows Hermes`, and also you can find information about previous LIT sprints. `/hb:resources lit 10`"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": ":three:`/hb:activites` Lists all the events and you can search for them."
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": "❓Get help at any time with `/hb help` or DM me and i'll see what i can do"
              }
            ]
          }
        ]
      }

      return text;

}

module.exports = {
    exec
  }