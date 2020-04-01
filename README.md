# Laivly Helpbot

Helpbot is a Slackbot that will check on you every now and then to see if you're ok or need help.

## Required Third-Party Applications

Install [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) on your local machine. It runs on the port `27017` by default. Also it's advised to install Compass to have a GUI to check the persisted data.

Download [ngrok](https://dashboard.ngrok.com/get-started) and follow the instructions to have it up and running. Also port we are using for localhost `3000` and please remember `ngrok` is not registered in %PATH%, so all commands need to be ran on the folder containing the executable.

## Installation

```node
npm install
```

## Execution

```node
npm run debug