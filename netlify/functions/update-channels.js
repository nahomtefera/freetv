// netlify/functions/updateChannels.js
const fs = require('fs');
const axios = require('axios');
const categories = require('../utils/channel-categories');
const parseM3U = require('../utils/parseM3U');

exports.handler = async () => {

    console.log('inside update-channels.js function, serverless function')

  try {
    console.log('inside update-channels.js function, serverless function')


    const allChannels = [];

    // Fetch channels from each category URL
    await Promise.all(categories.map(async (category) => {
      const response = await axios.get(category.url);
      const data = response.data;
      const parsedChannels = parseM3U(data, category);
      allChannels.push(...parsedChannels);
    }));


    // Write all channels to file
    fs.writeFileSync('netlify/file-dbs/channels.json', JSON.stringify(allChannels));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Channels updated successfully' })
    };
  } catch (error) {
    console.log('error updating channels', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update channels' })
    };
  }
};
