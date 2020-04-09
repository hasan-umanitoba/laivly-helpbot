async function exec(command) {

    let text = [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `Hey <@${command.user_id}> ! I am ready to remind you :slightly_smiling_face: ...\n\n *Please select an option :*`
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Drink Water* :droplet:\n Stay Hydrated!"
            },
            "accessory": {
              "type": "image",
              "image_url": "https://www.healthline.com/hlcmsresource/images/AN_images/how-much-water-should-you-drink-per-day-732x549-thumbnail.jpg",
              "alt_text": "alt text for image"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Event* :tada:\n Dont Miss Important Stuff! Schedule your Meetings , Conferences and many more events"
            },
            "accessory": {
              "type": "image",
              "image_url": "https://www.thebalancesmb.com/thmb/E6hp3YFsPw8mCK_39bw94CxE4Vk=/3456x3456/smart/filters:no_upscale()/asian-businesswoman-leading-meeting-at-boardroom-table-504987926-5ad21419c5542e0036d7003e.jpg",
              "alt_text": "alt text for image"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Jokes* :joy:\n I deliver funny, original jokes whenever you need to break the ice or impress someone!"
            },
            "accessory": {
              "type": "image",
              "image_url": "https://www.readersdigest.ca/wp-content/uploads/sites/14/2018/09/45-Short-Jokes-Anyone-Can-Remember-nicole-fornabaio-rd.com_-1024x683-1024x683.jpg",
              "alt_text": "alt text for image"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Water",
                  "emoji": true
                },
                "value": "click_me_1234",
                "action_id": "waterReminder_pressed"
  
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Event",
                  "emoji": true
                },
                "value": "click_me_123",
                "action_id": "eventReminder_pressed"
  
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Joke",
                  "emoji": true
                },
                "value": "click_me_123",
                "action_id": "jokeReminder_pressed"
  
              }
            ]
          }
        ]
      

      return text;

}

module.exports = {
    exec
  }