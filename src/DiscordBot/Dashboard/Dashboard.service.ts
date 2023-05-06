import { Injectable } from '@nestjs/common';
import { TextChannel } from 'discord.js';
import ChannelWiper from './ChannelWiper';

@Injectable()
export class DashboardService {
  public async generator(channel: TextChannel) {
    await ChannelWiper(channel);

    channel.send({ content: 'teste' });
  }
}
