const youTubeApi = require('../../apis/YouTubeApi');
const tokens = require('../../constants/tokens');

async function exec(task, text) {
  const response = await youTubeApi.listYouTubeVideos(task.query);

  if (response && response.items) {
    const position = parseInt(Math.random() * response.items.length);
    const video = response.items[position];

    text = text.replace(tokens.VIDEO_URI, `https://www.youtube.com/watch?v=${video.id.videoId}`);
  }

  return text;
}

module.exports = {
  exec
}