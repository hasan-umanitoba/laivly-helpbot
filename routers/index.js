const express = require('express');
const router = express.Router();

const actionRouter = require('./action-router');
const slackRouter = require('./slack-router');

router
  .use('/actions', actionRouter)
  .use('/slack', slackRouter)
  //.use('/test', testRouter)
;

module.exports = router;