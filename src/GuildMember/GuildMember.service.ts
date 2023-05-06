import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/Database/Database.service';
import { GuildMember } from '@prisma/client';

@Injectable()
export class GuildMemberService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(data: GuildMember): Promise<GuildMember> {
    return this.databaseService.guildMember.create({ data });
  }

  findAll() {
    return this.databaseService.guildMember.findMany();
  }

  findById(id: number) {
    return this.databaseService.guildMember.findUnique({
      where: { id },
    });
  }

  findByDiscordId(discordId: string) {
    return this.databaseService.guildMember.findUnique({
      where: { discordId },
    });
  }

  findByUsername(username: string) {
    return this.databaseService.guildMember.findUnique({
      where: { username },
    });
  }

  update(guildMember: GuildMember) {
    const { id, ...data } = guildMember;
    return this.databaseService.guildMember.update({
      data,
      where: { id },
    });
  }

  delete({ id }: GuildMember) {
    return this.databaseService.guildMember.delete({ where: { id } });
  }
}
