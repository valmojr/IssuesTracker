import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import { CronService } from './Cron';
import { DashboardService } from './Dashboard/Dashboard.service';
import { TextChannel } from 'discord.js';
import * as dotenv from 'dotenv';
import { IssueService } from './issues/Issue.service';
import { PrivateTrackerService } from './PrivateTracker/PrivateTracker.service';

@Injectable()
export class DiscordBotService {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly privateTrackerService: PrivateTrackerService,
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

    new CronService(process.env.DISCORD_DASHBOARD_INTERVAL, async () => {
      this.logger.log(
        `refreshing dashboard on ${guild.name} - ${dashboardChannel.name}`,
      );

      const issues = await this.issueService.fetchOpenIssues();

      const developers = await this.issueService.fetchDevelopers();

      this.dashboardService.generator(dashboardChannel, issues, developers);
    });

    new CronService(process.env.DISCORD_DASHBOARD_DIRECT_INTERVAL, async () => {
      const issues = await this.issueService.fetchOpenIssues();

      const developers = await this.issueService.fetchDevelopers();

      this.privateTrackerService.generator(client, issues, developers);
    });
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
