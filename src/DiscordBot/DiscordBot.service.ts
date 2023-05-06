import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import { CronService } from './Cron';
import { DashboardService } from './Dashboard/Dashboard.service';
import { TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';
import { IssueService } from './issues/Issue.service';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';

@Injectable()
export class DiscordBotService {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly guildMemberService: GuildMemberService,
    private readonly issueService: IssueService,
  ) {
    dotenv.config();
  }
  private readonly logger = new Logger(DiscordBotService.name);

  @Once('ready')
  public async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);

    const guild = await client.guilds.fetch(process.env.DISCORD_DEV_GUILD_ID);

    const dashboardChannel = (await guild.channels.fetch(
      process.env.DISCORD_DEV_DASHBOARD_CHANNEL_ID,
    )) as TextChannel;

    new CronService(
      process.env.DISCORD_DASHBOARD_WEEKDAYS_INTERVAL.toString(),
      async () => {
        this.logger.log(
          `refreshing dashboard on ${guild.name} - ${dashboardChannel.name}`,
        );
        this.dashboardService.generator(dashboardChannel);
      },
    );
    new CronService(
      process.env.DISCORD_DASHBOARD_WEEKEND_INTERVAL.toString(),
      async () => {
        this.logger.log(
          `refreshing dashboard on ${guild.name} - ${dashboardChannel.name}`,
        );
        this.dashboardService.generator(dashboardChannel);
      },
    );

    new CronService('0 * * * * *', async () => {
      this.logger.warn(`fetching issues`);
      const issues = await this.issueService.fetchOpenIssues();

      issues.forEach((issue) => {
        this.logger.log(issue.title);
      });

      this.logger.warn(`fetching users`);

      const developers = await this.issueService.fetchDevelopers();

      developers.forEach(async (developer) => {
        const { id, username } = developer;

        this.logger.log(username);

        await this.guildMemberService.findOrCreate({
          id,
          username,
          discordId: null,
        });
      });
    });

    console.log(await this.guildMemberService.findAll());
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}