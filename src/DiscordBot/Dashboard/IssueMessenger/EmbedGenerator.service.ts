import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Issue, User } from 'src/Util/entities';
import ParseBody from './ParseBody';
import ColorPicker from './ColorPicker';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';

@Injectable()
export class EmbedGeneratorService {
  constructor(private readonly guildMemberService: GuildMemberService) {}
  public async DashboardEmbedIssue(issue: Issue, developers: User[]) {
    const tasks = ParseBody.tasksGenerator(issue.body);
    console.log(
      `${issue.title} - Tasks: ${tasks.length}, Complete Tasks: ${
        tasks.filter((task) => task.isDone).length
      }`,
    );
    const embedIssue = new EmbedBuilder();

    const assignees = issue.assignees
      ? (
          await Promise.all(
            issue.assignees.map(
              (assignee) =>
                `<@${
                  developers.filter((dev) => dev.id === assignee.id)[0]
                    .discordId
                }>`,
            ),
          )
        ).join(', ')
      : 'Ninguém';
    embedIssue.setTitle(issue.title);
    embedIssue.addFields([
      {
        name: 'Progresso:',
        value: `${Math.round(
          (tasks.filter((task) => task.isDone).length / tasks.length) * 100,
        )}%`,
        inline: true,
      },
      {
        name: 'Responsável',
        value: assignees,
        inline: true,
      },
    ]);
    if (issue.assignees && issue.assignees?.length > 0)
      embedIssue.setColor(ColorPicker(tasks));

    return embedIssue;
  }

  public async PrivateMessageEmbedIssue(issue: Issue) {
    const tasks = ParseBody.tasksGenerator(issue.body);

    const embedIssue = new EmbedBuilder();

    embedIssue.setTitle(issue.title);
    if (issue.assignees.length > 0) embedIssue.setColor(ColorPicker(tasks));

    return embedIssue;
  }
}
