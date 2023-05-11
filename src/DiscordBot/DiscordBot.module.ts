import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { DiscordBotService } from './DiscordBot.service';
import { DiscordBotConfigService } from './DiscordBotConfig.service';
import { DashboardService } from './Dashboard/Dashboard.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';
import { IssueService } from './issues/Issue.service';
import { EmbedGeneratorService } from './Dashboard/IssueMessenger/EmbedGenerator.service';
import { PrivateTrackerService } from './PrivateTracker/PrivateTracker.service';
import { DatabaseService } from 'src/Database/Database.service';
import { MessageComponentHandlerService } from './ComponentHandlers.service';
import { EmbedIssueBuilderService } from './PrivateTracker/EmbedIssueBuilder.service';
import { IssueMessageSenderService } from './PrivateTracker/IssueMessageBuilder.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NecordModule.forRootAsync({
      useClass: DiscordBotConfigService,
    }),
  ],
  providers: [
    DiscordBotConfigService,
    DiscordBotService,
    DashboardService,
    PrivateTrackerService,
    MessageComponentHandlerService,
    GuildMemberService,
    DatabaseService,
    EmbedIssueBuilderService,
    IssueMessageSenderService,
    IssueService,
    EmbedGeneratorService,
  ],
})
export class DiscordBotModule {}
