const axios = require('axios');

async function exec(task, text, payload) {
  const response = (await axios.get(`https://quotes.rest/qod`)).data;

  if (response && response.contents && response.contents.quotes) {
    const quoteOfTheDay = response.contents.quotes[0];

    text = `*${quoteOfTheDay.quote}* - _${quoteOfTheDay.author}_`;
  }

  return text;
}

module.exports = {
  exec
}