import { Injectable, Logger } from '@nestjs/common';
import { TextChannel } from 'discord.js';
import { Button, ButtonContext, ComponentParam, Context } from 'necord';
import { IssueService } from './issues/Issue.service';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';
import { User } from 'src/Util/entities';
import ParseBody from 'src/Util/ParseBody';

@Injectable()
export class MessageComponentHandlerService {
  constructor(
    private readonly issueService: IssueService,
    private readonly guildMemberService: GuildMemberService,
  ) {}
  private readonly logger = new Logger(MessageComponentHandlerService.name);

  @Button('issueDrop/:issueId')
  async dropButton(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('issueId') issueId: string,
  ) {
    const guild = await interaction.client.guilds.fetch(
      process.env.DISCORD_DEV_GUILD_ID,
    );

    const channel = (await guild.channels.fetch(
      process.env.DISCORD_DEV_DASHBOARD_CHANNEL_ID,
    )) as TextChannel;

    const dev = await this.guildMemberService.findByDiscordId(
      interaction.user.id,
    );

    let assignee: User;

    const issue = await this.issueService.fetchIssue(issueId);

    if (issue.assignee.id === dev.id) {
      assignee = issue.assignee;
      issue.assignee = null;
    }

    issue.assignees = issue.assignees.filter(
      (issueAssignee) => issueAssignee.id != assignee.id,
    );

    const updatedissue = await this.issueService.updateIssue(issue);

    console.log(updatedissue);

    channel.send(
      `@everyone O Sr. <@${interaction.user.id}> desistiu de fazer ${
        (await issue).title
      }, mostrando para o turno inteiro que é um fraco!`,
    );

    this.logger.warn(
      `O Sr. ${interaction.user.username} desistiu de fazer ${
        (await issue).title
      }, mostrando para o turno inteiro que é um fraco!`,
    );

    interaction.reply({
      content: `<#${process.env.DISCORD_DEV_DASHBOARD_CHANNEL_ID}>`,
      ephemeral: true,
    });
  }

  @Button('doneIssue/:issueId/:taskId')
  async doneButton(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('issueId') issueId: string,
    @ComponentParam('taskId') taskId: string,
  ) {
    const issue = await this.issueService.fetchIssue(issueId);

    const tasks = ParseBody.tasksGenerator(issue.body);

    tasks[taskId].isDone = true;

    const task = tasks[taskId];

    const updatedBody = ParseBody.bodyGenerator(tasks);

    issue.body = updatedBody;

    await this.issueService.updateIssueBody(issue);

    //await interaction.message.edit({
    //  content: `• ${task.task}`,
    //  components: [
    //    new ActionRowBuilder<ButtonBuilder>().addComponents(
    //      task.isDone
    //        ? doneButton(issue.id, task.id)
    //        : doButton(issue.id, task.id),
    //    ),
    //  ],
    //});

    return interaction.reply({
      content: `Tarefa: "${task.task}" concluída`,
      ephemeral: true,
    });
  }
}
