import { DMChannel } from 'discord.js';

export default async (dmChannel: DMChannel) => {
  const messages = await dmChannel.messages.fetch({ limit: 100 });

  messages.forEach((message) => message.delete());
};
