const {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} = require('discord-interactions');

module.exports = async (request, response) =>
{
  if(request.method !== 'POST')
    return;

  const signature = request.headers['x-signature-ed25519'];
  const timestamp = request.headers['x-signature-timestamp'];
  const rawBody = JSON.stringify(request.body);

  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    process.env.PUBLIC_KEY
  );

  if(!isValidRequest)
  {
    console.error('Invalid Request');
    return response.status(401).send({ error: 'Bad request signature ' });
  }

  const message = request.body;
  console.log(message);

  if(message.type === InteractionType.PING)
  {
    console.log('Handling Ping request');
    response.send({
      type: InteractionResponseType.PONG,
    });
  }
  else if(message.type === InteractionType.APPLICATION_COMMAND)
  {
    switch(message.data.name.toLowerCase())
    {
      case 'hello':
        console.log('Hello');
        response.status(200).send({
          type: 4,
          data: { content: 'hello' },
        });
        break;
      default:
        console.error('Unknown Command');
        response.status(400).send({ error: 'Unknown Type' });
        break;
    }
  }
  else
  {
    console.error('Unknown Type');
    response.status(400).send({ error: 'Unknown Type' });
  }
};
