import got from 'got';

const hello =
{
  name: 'hello',
  description: 'hello command',
};

const discordCommandsUrl = `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`;

(async () =>
{
  const response = await got.put(discordCommandsUrl, {
    headers: { Authorization: `Bot ${process.env.TOKEN}` },
    json: [hello],
  });

  console.log(response.body);

  if(response.statusCode === 200)
    console.log('Successfully registered commands');
  else
    console.error('Error registering commands');
})();
