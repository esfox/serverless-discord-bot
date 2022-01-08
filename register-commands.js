import got from 'got';
import { SlashCommandBuilder } from '@discordjs/builders';

const hello = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('hello command')
  .toJSON();

const discordCommandsUrl = `https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/commands`;

const apiClient = got.extend({
  headers: { Authorization: `Bot ${process.env.TOKEN}` },
});

(async () =>
{
  const response = await apiClient.put(discordCommandsUrl, {
    json: [hello],
  });

  if(response.statusCode === 200)
    console.log('Successfully registered commands');
  else
    console.error('Error registering commands');
})();
