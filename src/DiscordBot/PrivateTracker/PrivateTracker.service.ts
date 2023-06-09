import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'discord.js';
import { Issue, User } from 'src/Util/entities';
import ChannelWiper from './ChannelWiper';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';
import { IssueMessageSenderService } from './IssueMessageBuilder.service';

@Injectable()
export class PrivateTrackerService {
  constructor(
    private readonly guildMemberService: GuildMemberService,
    private readonly issueMessageBuilderService: IssueMessageSenderService,
  ) {}
  private logger = new Logger(PrivateTrackerService.name);

  public async generator(client: Client, issues: Issue[], developers: User[]) {
    this.logger.log('Generating private messages for issue handling');

    developers.forEach(async (dev) => {
      const devIssues = issues.filter((issue) =>
        issue.assignees?.map((assignees) => assignees?.id).includes(dev.id),
      );

      dev.discordId = (
        await this.guildMemberService.findById(dev.id)
      )?.discordId;

      const targetUser = await client.users.fetch(dev.discordId); // erro aqui
      const targetUserDMchannel = await targetUser.createDM();
      await ChannelWiper(targetUserDMchannel);

      this.issueMessageBuilderService.sender(targetUserDMchannel, devIssues);

      await targetUser.deleteDM();
    });
  }
}
