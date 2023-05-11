import { DMChannel } from 'discord.js';

export default async (dmChannel: DMChannel) => {
  try {
    const messages = await dmChannel.messages.fetch({ limit: 100 });
    messages.each((message) => message.delete());
  } catch (error) {
    console.error('Error deleting messages in DM channel:', error);
  }
};
