const axios = require('axios');
const url = process.env.PRODUCER_HOST;
const apiKey = process.env.PRODUCER_API_KEY;

// Custom serializer for BigInt values
function customStringify(obj) {
    return JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
        2
    );
}


async function publish(respObj) {

    const message = customStringify(respObj);
    if (url === undefined || apiKey === undefined) {
        throw new Error('PRODUCER_HOST is not defined');
    }

    const endpoint = url + '/api/v1/producer/public-portal';

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: endpoint,
        headers: {
            'x-api-key': apiKey
        },
        data: message
    };

    const resp = await axios.request(config)

    if (resp.status !== 200) {
        throw new Error('Error in creating job: ' + resp.data);
    } else {
        console.log('Job created successfully');
    }

}

module.exports = publish;