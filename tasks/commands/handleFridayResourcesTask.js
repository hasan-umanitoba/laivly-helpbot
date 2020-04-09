async function exec(command) {

    let text;

    let commandtext = command.text.split(" ");

    if (commandtext[0] == "lit")
    {
      switch(commandtext[1])
      {
        case "10":
          text = {
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": ":fire:Information about *LIT 10* :fire:"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "Project idea: A Chat bot to help users working from home and to assist with simple tasks"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "Technology: NodeJs, Express, JavaScript, Slack Bolt, GoogleAPI, Python, Heroku"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "BitBucket: https://bitbucket.247a.io/"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "Team Members: \nRomeo \nHumberto \nJersey \nOrion \nHasan"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "Technology: NodeJs, Express, JavaScript, Slack Bolt, GoogleAPI, Python, Heroku"
                }
              },
              {
                "type": "context",
                "elements": [
                  {
                    "type": "mrkdwn",
                    "text": "For more info, ask any of the team members"
                  }
                ]
              }
            ]
          }
          break;
          default:
            text = "Lit sprint does not exist";      
        }
    }   
    return text;
}

module.exports = {
    exec
  }