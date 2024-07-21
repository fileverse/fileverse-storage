const { createClient } = require('redis');
const redisUrl = process.env.REDIS_URL || '127.0.0.1:6379';

// Custom serializer for BigInt values
function customStringify(obj) {
    return JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
        2
    );
}


async function publish(respObj) {

    const client = await createClient({ url: `redis://${redisUrl}` })
        .on('connect', () => console.log('Connected to Redis'))
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    const message = customStringify(respObj);
    let resp = await client.xAdd(
        "public-portal",
        "*",
        { job: message },
    );

    console.log(`Published message with ID: ${resp}`);
}

module.exports = publish;