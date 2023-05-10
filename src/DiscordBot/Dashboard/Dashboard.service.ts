import { Injectable } from '@nestjs/common';
import { TextChannel } from 'discord.js';
import ChannelWiper from './ChannelWiper';
import { Issue, User } from 'src/Util/entities';
import { EmbedGeneratorService } from './IssueMessenger/EmbedGenerator.service';

@Injectable()
export class DashboardService {
  constructor(private readonly embedGeneratorService: EmbedGeneratorService) {}
  public async generator(
    channel: TextChannel,
    issues: Issue[],
    developers: User[],
  ) {
    await ChannelWiper(channel);

    issues.forEach(async (issue) => {
      if (issue.assignee) {
        channel.send({
          embeds: [
            await this.embedGeneratorService.DashboardEmbedIssue(
              issue,
              developers,
            ),
          ],
        });
      }
    });
  }
}
