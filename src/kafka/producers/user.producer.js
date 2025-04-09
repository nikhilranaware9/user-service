const kafka = require('../client');

const producer = kafka.producer();

const sendUserCreatedEvent = async (userPayload) => {
  await producer.connect();

  await producer.send({
    topic: 'account-user-created',
    messages: [
      {
        key: userPayload.userId.toString(),
        value: JSON.stringify(userPayload),
      },
    ],
  });

  await producer.disconnect();
};

module.exports = { sendUserCreatedEvent };
