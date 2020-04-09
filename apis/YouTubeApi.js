const axios = require('axios');

const youTubeUri = process.env.YOUTUBE_API_URI;
const youTubeKey = process.env.YOUTUBE_API_KEY;

/**
 * @param {String} query
 * @returns {Object|null}
 */
async function listYouTubeVideos(query) {
  let response = null;
  const params = `part=snippet&eventType=completed&order=relevance&safeSearch=strict&type=video&videoDimension=2d&maxResults=25&key=${youTubeKey}&q=${query}`;

  try {
    response = await axios.get(`${youTubeUri}/search?${params}`);
  } catch(e) {
    console.log(e);
  }

  return response ? response.data : null;
}

module.exports = {
  listYouTubeVideos
}