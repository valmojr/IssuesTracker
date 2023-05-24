import { DMChannel, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Issue } from 'src/Util/entities';
import dropButton from '../Buttons/drop.button';
import { EmbedIssueBuilderService } from './EmbedIssueBuilder.service';
import { Injectable } from '@nestjs/common';
import checkButton from '../Buttons/check.button';

@Injectable()
export class IssueMessageSenderService {
  constructor(
    private readonly embedIssueBuilderService: EmbedIssueBuilderService,
  ) {}

  public async sender(channel: DMChannel, issues: Issue[]) {
    issues.forEach(async (issue) => {
      await channel.send({
        embeds: [await this.embedIssueBuilderService.buildIssueEmbed(issue)],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            dropButton(issue.id),
          ),
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            checkButton(issue.id),
          ),
        ],
      });
    });
  }
}
