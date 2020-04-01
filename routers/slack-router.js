const express = require('express');
const slackService = require('../services/SlackService');
const router = express.Router();

const node = "slack";

router.get('/bot-info', async (request, response) => {
    response.json(await slackService.getBotInfo());
});

router.post('/events', (request, response) => {
    response.json({ challenge: request.body.challenge });
});

module.exports = router;