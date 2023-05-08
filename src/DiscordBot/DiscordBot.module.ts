import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { DiscordBotService } from './DiscordBot.service';
import { DiscordBotConfigService } from './DiscordBotConfig.service';
import { DashboardService } from './Dashboard/Dashboard.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';
import { DatabaseService } from 'src/Database/Database.service';
import { IssueService } from './issues/Issue.service';
import { EmbedGeneratorService } from './Dashboard/IssueMessenger/EmbedGenerator.service';

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
    GuildMemberService,
    DatabaseService,
    IssueService,
    EmbedGeneratorService,
  ],
})
export class DiscordBotModule {}
