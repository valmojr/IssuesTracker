import { DMChannel, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import ParseBody, { Task } from 'src/Util/ParseBody';
import { Issue } from 'src/Util/entities';
import doButton from '../Buttons/do.button';
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
      const tasks = ParseBody.tasksGenerator(issue.body);

      const taskButtons = (tasks: Task[]) =>
        tasks
          .filter((task) => !task.isDone)
          .map((task) =>
            new ActionRowBuilder<ButtonBuilder>().addComponents(
              doButton(issue.id, task),
            ),
          );

      await channel.send({
        embeds: [await this.embedIssueBuilderService.buildIssueEmbed(issue)],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            dropButton(issue.id),
          ),
          ...taskButtons(tasks),
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            checkButton(issue.id),
          ),
        ],
      });
    });
  }
}
