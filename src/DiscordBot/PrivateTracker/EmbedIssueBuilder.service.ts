import { EmbedBuilder } from 'discord.js';
import ParseBody from 'src/Util/ParseBody';
import { Issue } from 'src/Util/entities';
import ColorPicker from '../Dashboard/IssueMessenger/ColorPicker';
import ParseLabel, { translateLabelToFields } from 'src/Util/ParseLabel';
import MonthTranslator from 'src/Util/MonthTranslator';
import { Injectable } from '@nestjs/common';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';
@Injectable()
export class EmbedIssueBuilderService {
  constructor(private readonly guildMemberService: GuildMemberService) {}

  public async buildIssueEmbed(issue: Issue) {
    const tasks = ParseBody.tasksGenerator(issue.body);

    const labels = ParseLabel(issue);

    const embedIssue = new EmbedBuilder()
      .setTitle(issue.title)
      .setColor(ColorPicker(tasks));

    translateLabelToFields(labels, embedIssue);

    const assignees =
      issue.assignees?.length > 1
        ? {
            name: 'Responsáveis',
            value: `Você, ${issue.assignees
              .map(
                async (assignees) =>
                  `<@${
                    (await this.guildMemberService.findById(assignees.id))
                      .discordId
                  }>`,
              )
              .join(', ')}`,
          }
        : { name: 'Responsável', value: 'Você' };

    embedIssue.addFields(assignees);

    if (issue?.milestone) {
      const due_on = new Date(issue.milestone.due_on);

      embedIssue.addFields({
        name: 'Prazo',
        value: `${due_on.getDay()}/${MonthTranslator(due_on.getMonth())}\n`,
      });
    }

    return embedIssue;
  }
}
