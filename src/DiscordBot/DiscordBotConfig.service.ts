import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { IntentsBitField } from 'discord.js';
import { NecordModuleOptions } from 'necord/dist/necord-options.interface';

@Injectable()
export class DiscordBotConfigService {
  createNecordOptions(): NecordModuleOptions {
    return {
      token: process.env.DISCORD_BOT_TOKEN,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.AutoModerationConfiguration,
        IntentsBitField.Flags.AutoModerationExecution,
      ],
      prefix: '!',
      development: [process.env.DISCORD_DEV_GUILD_ID],
    };
  }
}
