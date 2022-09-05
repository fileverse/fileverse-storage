const { Log } = require('../../infra/database/models');

async function getByContract({ contractAddress }) {
  const startFrom = new Date();
  const res = await Log.aggregate([
    {
      $match: {
        contractAddress,
        timeStamp: { $gte: startFrom },
      },
    },
    {
      $group: {
        _id: {
          time: { $dateToString: { format: '%Y-%m-%d', date: '$timeStamp' } },
          eventName: '$eventName',
        },
        eventName: { $first: '$eventName' },
        count: { $sum: 1 },
        dateLabel: {
          $first: {
            $dateToString: { format: '%Y-%m-%d', date: '$timeStamp' },
          },
        },
        timeStamp: {
          $first: { $subtract: ['$timeStamp', new Date('1970-01-01')] },
        },
      },
    },
    { $sort: { timeStamp: 1 } },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  return { contractAddress, dataPoints: res };
}

module.exports = getByContract;
