// netlify/functions/increment-channel-views.js
// import { createClient } from 'redis';
const redis = require('redis');
require('dotenv').config();

exports.handler = async (event) => {
 
    // Create a Redis client
    try {
        const { tvgId } = JSON.parse(event.body);
        console.log("tvgId: ", tvgId);

        // Create a Redis client
        const client = redis.createClient({
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });

        client.on('connect', () => {
            console.log('Connected to Redis');
        });

        client.on('error', (err) => {
            console.error('Error connecting to Redis:', err);
        });


        await client.connect();
        // Increment the view count for the channel
        client.incr(tvgId, (err, newCount) => {
            if (err) {
                reject(err);
            } else {
                resolve(newCount);
            }
        });

        // Close the Redis connection

        client.quit();
             
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Channel views incremented successfully' })
        };

    } catch (error) {
        console.error('Error handling channel click:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to handle channel click' })
        };
    }
};
